import { expect, test, type Page } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { pending, completed } from "../fixtures";

const invitation = (scenario: string) => `lxpro_${scenario}_${randomUUID().replaceAll("-", "")}123456789`;
async function noOverflow(page: Page) { await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true); }
async function fillStep(page: Page, values: ReturnType<typeof completed>) {
  for (const field of await page.locator("main form input, main form textarea, main form select").all()) {
    const id = await field.getAttribute("id"); if (!id || !(id in values)) continue;
    const type = await field.getAttribute("type"); if (["checkbox", "radio"].includes(type ?? "")) continue;
    if (await field.evaluate(element => element.tagName === "SELECT")) await field.selectOption(String(values[id]));
    else await field.fill(String(values[id]));
  }
}
async function snapshot(page: Page, path: string) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path, fullPage: true });
}
async function complete(page: Page, selected: string[], medication = false, captureDog?: () => Promise<void>) {
  const resolution = pending(selected); const answers = completed(resolution);
  for (const step of resolution.structure.steps) {
    await fillStep(page, answers);
    if (step.id === "dog_1" && medication) {
      const detail = page.locator("#dog_1_medications"); await expect(detail).toHaveCount(0);
      await page.locator("#dog_1_takes_medication").selectOption("Sí");
      await page.getByRole("button", { name: "Continuar", exact: true }).click();
      await expect(detail).toHaveAttribute("aria-invalid", "true");
      await detail.fill("TEST Medicación que no debe enviarse al ocultarse");
      await page.locator("#dog_1_takes_medication").selectOption("No"); await expect(detail).toHaveCount(0);
    }
    await noOverflow(page);
    if (step.id === "dog_1") await captureDog?.();
    if (step.id !== "closing") await page.getByRole("button", { name: "Continuar", exact: true }).click();
  }
}

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", route => new URL(route.request().url()).origin === new URL(baseURL!).origin ? route.continue() : route.abort());
});
test("no token is informational, no resolve, no PRO legacy, noindex/no-referrer/no-store and historical redirect", async ({ page }) => {
  let resolves = 0; page.on("request", req => { if (req.url().endsWith("/api/admission-pro/resolve")) resolves++; });
  const response = await page.goto("/admission-pro.html");
  await expect(page).toHaveURL(/\/admission-pro$/);
  await expect(page.getByRole("link", { name: "Realizar solicitud inicial" })).toHaveAttribute("href", "/request");
  await expect(page.locator("main form")).toHaveCount(0); expect(resolves).toBe(0);
  expect(response!.headers()["referrer-policy"]).toBe("no-referrer"); expect(response!.headers()["cache-control"]).toContain("no-store");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  expect(await page.content()).not.toContain('admission-pro.html"');
});

for (const item of [{ scenario: "o", dogs: ["dog_1"], width: 1280, transport: "hash" }, { scenario: "t", dogs: ["dog_1", "dog_2", "dog_3"], width: 390, transport: "query" }, { scenario: "n", dogs: ["dog_1", "dog_3"], width: 768, transport: "hash" }]) {
  test(`real local boundary, ${item.transport} token, prefill and submit ${item.dogs.join("+")} at ${item.width}px`, async ({ page, baseURL }, info) => {
    await page.setViewportSize({ width: item.width, height: 900 });
    const token = invitation(item.scenario); const requests: { body: string; authorization?: string; referrer?: string }[] = [];
    const logs: string[] = []; const getUrls: string[] = []; const documentUrls: string[] = [];
    page.on("console", message => logs.push(message.text()));
    page.on("pageerror", error => logs.push(error.message));
    page.on("request", req => {
      if (req.method() === "GET") getUrls.push(req.url());
      if (req.isNavigationRequest() && req.resourceType() === "document") documentUrls.push(req.url());
    });
    page.on("request", req => { if (req.url().includes("/api/admission-pro/")) requests.push({ body: req.postData()!, authorization: req.headers().authorization, referrer: req.headers().referer }); });
    const resolve = page.waitForResponse(r => r.url().endsWith("/api/admission-pro/resolve"));
    const initial = await page.goto(`/admission-pro${item.transport === "hash" ? "#" : "?"}token=${token}`);
    if (item.transport === "hash") expect(initial!.request().url()).toBe(`${baseURL}/admission-pro`);
    expect((await resolve).status()).toBe(200);
    await expect(page).toHaveURL(/\/admission-pro$/);
    expect(JSON.parse(requests[0].body)).toEqual({ token });
    await expect(page.getByRole("region", { name: "Información que ya tenemos" })).toContainText("TEST Tutor Peña");
    await expect(page.locator("#tutor_name")).toHaveCount(0);
    for (let i = 1; i <= 5; i++) await expect(page.getByRole("navigation", { name: "Progreso del formulario PRO" }).getByText(`Sobre TEST Perro ${i}`)).toHaveCount(item.dogs.includes(`dog_${i}`) ? 1 : 0);
    await noOverflow(page); await snapshot(page, info.outputPath(`prefill-${item.width}.png`));
    await complete(page, item.dogs, true, () => snapshot(page, info.outputPath(`dog-${item.width}.png`)));
    await snapshot(page, info.outputPath(`closing-${item.width}.png`));
    const submit = page.waitForResponse(r => r.url().endsWith("/api/admission-pro/submit"));
    await page.getByRole("button", { name: "Enviar formulario PRO" }).click();
    const receipt = await submit; expect(receipt.status(), await receipt.text()).toBe(202); expect(await receipt.json()).toEqual({ accepted: true });
    await expect(page.getByRole("heading", { name: "Formulario PRO recibido", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Continuar por WhatsApp", exact: true })).toHaveAttribute("href", /^https:\/\/wa.me\//);
    const sent = JSON.parse(requests[1].body); expect(Object.keys(sent).sort()).toEqual(["answers", "form_version", "token"]);
    expect(sent.token).toBe(token); expect(sent.form_version).toBe(1); expect(sent.answers).not.toHaveProperty("dog_1_medications");
    for (const [key, value] of Object.entries(pending(item.dogs).prefill)) expect(sent.answers[key]).toBe(value);
    for (let i = 1; i <= 5; i++) expect(Object.hasOwn(sent.answers, `dog_${i}_name`)).toBe(item.dogs.includes(`dog_${i}`));
    expect(requests.every(r => !r.authorization && !r.referrer)).toBe(true);
    expect(documentUrls).toHaveLength(1); // replaceState does not reload or navigate
    if (item.transport === "hash") expect(getUrls.every(url => !url.includes(token))).toBe(true);
    expect(logs.every(message => !message.includes(token))).toBe(true);
    const storage = await page.evaluate(() => JSON.stringify({ local: { ...localStorage }, session: { ...sessionStorage } }));
    expect(storage).not.toContain(token); expect(storage).not.toContain("TEST Tutor");
    const wa = decodeURIComponent(await page.getByRole("link", { name: "Continuar por WhatsApp", exact: true }).getAttribute("href") ?? "");
    expect(wa).not.toMatch(/lxpro_|TEST|Medicación/); expect(await page.locator("main").textContent()).not.toMatch(/Ã|Â|\uFFFD/);
    await snapshot(page, info.outputPath(`success-${item.width}.png`));
  });
}

test("hash wins over a legacy query and both are removed before resolve", async ({ page }) => {
  const token = invitation("o");
  const response = page.waitForResponse(r => r.url().endsWith("/api/admission-pro/resolve"));
  await page.goto(`/admission-pro?token=legacy-invalid&source=test#token=${token}`);
  const resolved = await response; expect(resolved.status()).toBe(200);
  expect(resolved.request().postDataJSON()).toEqual({ token });
  await expect(page).toHaveURL(/\/admission-pro$/);
  await expect(page.getByText("Información que ya tenemos")).toBeVisible();
});

test("429 local mock retry preserves exact payload and double-click sends once", async ({ page }) => {
  const bodies: string[] = []; page.on("request", r => { if (r.url().endsWith("/api/admission-pro/submit")) bodies.push(r.postData()!); });
  await page.goto(`/admission-pro#token=${invitation("r")}`); await expect(page.getByText("Información que ya tenemos")).toBeVisible();
  await complete(page, ["dog_1", "dog_3"]);
  await page.getByRole("button", { name: "Enviar formulario PRO" }).dblclick();
  await expect(page.getByRole("main").getByRole("alert")).toContainText("varios intentos"); expect(bodies).toHaveLength(1);
  await expect(page.getByRole("link", { name: "Continuar por WhatsApp", exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Editar datos", exact: true })).toBeEnabled();
  await page.getByRole("button", { name: "Intentar nuevamente" }).click();
  await expect(page.getByRole("heading", { name: "Formulario PRO recibido", exact: true })).toBeVisible();
  expect(bodies).toHaveLength(2); expect(bodies[0]).toBe(bodies[1]);
});
for (const scenario of ["x", "e", "v", "c"]) {
  test(`invitation ${scenario} never renders fields or restarts initial request`, async ({ page }) => {
    await page.goto(`/admission-pro?token=${invitation(scenario)}`);
    await expect(page.getByRole("heading", { name: scenario === "c" ? "Este formulario PRO ya fue recibido" : "Este enlace ya no está disponible." })).toBeVisible();
    await expect(page.locator("main form")).toHaveCount(0); await expect(page.getByRole("link", { name: "Realizar solicitud inicial" })).toHaveCount(0);
    await expect(page).toHaveURL(/\/admission-pro$/);
  });
}
test("public homepage no longer promotes an open PRO", async ({ page }) => {
  await page.goto("/"); await expect(page.locator('a[href*="admission-pro"]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Realizar solicitud inicial" })).toHaveAttribute("href", "/request");
});
