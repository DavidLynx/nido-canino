import { expect, test, type Page } from "@playwright/test";

async function next(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
}
async function complete(page: Page, name = "TEST ACCEPTED", dogs = 1) {
  await page.locator("#full_name").fill(name); await page.locator("#phone").fill("3000000000");
  await page.locator("#locality").fill("Fontibón"); await page.locator("#zone").fill("Modelia"); await next(page);
  await page.locator("#source_self_reported").selectOption("Instagram"); await next(page);
  await page.locator("#need_type").selectOption("Aún no estoy seguro"); await next(page);
  await page.locator("#dog_count").selectOption(String(dogs));
  for (let i = 1; i <= dogs; i++) {
    await page.locator(`#dog_${i}_name`).fill(`Perro prueba ${i}`); await page.locator(`#dog_${i}_age`).fill("3 años");
    await page.locator(`#dog_${i}_breed_or_type`).fill("Mestizo"); await page.locator(`#dog_${i}_sex`).selectOption("Macho");
    await page.locator(`#dog_${i}_size`).selectOption("Mediano"); await page.locator(`#dog_${i}_neutered`).selectOption("Sí");
  }
  await next(page); await page.locator("#dog_relationship").selectOption({ index: 1 }); await page.locator("#cat_reaction").selectOption({ index: 1 });
  await page.locator("#bite_history").selectOption("No"); await page.locator("#special_health_need").fill("No"); await next(page);
  await page.locator('[name="privacy_consent"]').check();
}

test.beforeEach(async ({ page, baseURL }) => {
  // Browser network is local-only. The Nido server's configured receiver is the local mock.
  await page.route("**/*", (route) => new URL(route.request().url()).origin === new URL(baseURL!).origin ? route.continue() : route.abort());
});

for (const width of [390, 768, 1024, 1280]) {
  test(`renders and submits without horizontal overflow at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/request?source=services&intent=evaluacion&utm_campaign=test");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Conozcamos a su perro.");
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: info.outputPath(`request-${width}.png`), fullPage: true });
    await complete(page, "TEST ACCEPTED", width === 390 ? 3 : 1);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: info.outputPath(`review-${width}.png`), fullPage: true });
    const response = page.waitForResponse((r) => r.url().endsWith("/api/request"));
    await page.getByRole("button", { name: "Enviar solicitud" }).click();
    const received = await response;
    expect(received.status(), await received.text()).toBe(202);
    await expect(page.getByRole("link", { name: "Continuar por WhatsApp ↗" })).toBeVisible();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: info.outputPath(`success-${width}.png`), fullPage: true });
  });
}

test("429 retry preserves full envelope and only accepted retry enables WhatsApp", async ({ page }) => {
  const bodies: string[] = [];
  page.on("request", (r) => { if (r.url().endsWith("/api/request")) bodies.push(r.postData()!); });
  await page.goto("/request"); await complete(page, "TEST RATE LIMIT");
  await page.getByRole("button", { name: "Enviar solicitud" }).click();
  await expect(page.getByRole("main").getByRole("alert")).toContainText("varios intentos");
  await expect(page.getByRole("link", { name: "Continuar por WhatsApp ↗" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Editar solicitud" })).toBeEnabled();
  await page.getByRole("button", { name: "Intentar nuevamente" }).click();
  await expect(page.getByRole("link", { name: "Continuar por WhatsApp ↗" })).toBeVisible();
  expect(bodies).toHaveLength(2); expect(bodies[0]).toBe(bodies[1]);
});

test("real upstream timeout keeps attempt; retry returns accepted without duplicate", async ({ page }) => {
  const bodies: string[] = [];
  page.on("request", (r) => { if (r.url().endsWith("/api/request")) bodies.push(r.postData()!); });
  await page.goto("/request"); await complete(page, "TEST TIMEOUT");
  await page.getByRole("button", { name: "Enviar solicitud" }).click();
  await expect(page.getByRole("main").getByRole("alert")).toContainText("tardando", { timeout: 20_000 });
  await expect(page.getByRole("link", { name: "Continuar por WhatsApp ↗" })).toHaveCount(0);
  await expect(page.getByText("Si cambia los datos, se enviará como una nueva solicitud.")).toBeVisible();
  await page.getByRole("button", { name: "Intentar nuevamente" }).click();
  await expect(page.getByRole("link", { name: "Continuar por WhatsApp ↗" })).toBeVisible();
  expect(bodies[0]).toBe(bodies[1]);
});

test("mobile error editing preserves data, prunes removed dogs and submits with a new code", async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 900 });
  const bodies: string[] = [];
  page.on("request", (r) => { if (r.url().endsWith("/api/request")) bodies.push(r.postData()!); });
  await page.goto("/request?utm_campaign=recovery-test"); await complete(page, "TEST ERROR", 3);
  await page.locator("#care_concern").fill("Conservar contexto de prueba");
  await page.getByRole("button", { name: "Enviar solicitud" }).click();
  await expect(page.getByRole("main").getByRole("alert")).toBeVisible();
  await expect(page.getByRole("button", { name: "Intentar nuevamente" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Editar solicitud" })).toBeEnabled();
  await expect(page.getByRole("link", { name: "Continuar por WhatsApp ↗" })).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath("error-390.png"), fullPage: true });
  await page.getByRole("button", { name: "Editar solicitud" }).click();
  await expect(page.locator("#care_concern")).toHaveValue("Conservar contexto de prueba");
  await expect(page.locator("#care_concern")).toBeEnabled();
  await expect(page.getByRole("main").getByRole("alert")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Continuar por WhatsApp ↗" })).toHaveCount(0);
  await page.getByRole("button", { name: /^Ir al paso 4:/ }).click();
  await expect(page.locator("#dog_3_name")).toHaveValue("Perro prueba 3");
  await page.locator("#dog_count").selectOption("1");
  await expect(page.locator("#dog_3_name")).toHaveCount(0);
  await page.getByRole("button", { name: /^Ir al paso 1:/ }).click();
  await expect(page.locator("#full_name")).toHaveValue("TEST ERROR");
  await page.locator("#full_name").fill("TEST ACCEPTED");
  await page.getByRole("button", { name: /^Ir al paso 6:/ }).click();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath("editing-390.png"), fullPage: true });
  await page.locator('[name="privacy_consent"]').check();
  await page.getByRole("button", { name: "Enviar solicitud" }).click();
  await expect(page.getByRole("link", { name: "Continuar por WhatsApp ↗" })).toBeVisible();
  expect(bodies).toHaveLength(2);
  const [original, edited] = bodies.map((body) => JSON.parse(body));
  expect(edited.external_request_id).not.toBe(original.external_request_id);
  expect(edited.submitted_at).not.toBe(original.submitted_at);
  expect(edited.consent_accepted_at).not.toBe(original.consent_accepted_at);
  expect(edited.attribution).toEqual(original.attribution);
  expect(edited.answers.full_name).toBe("TEST ACCEPTED");
  expect(edited.answers.care_concern).toBe(original.answers.care_concern);
  expect(edited.answers.dog_count).toBe(1);
  expect(edited.answers).not.toHaveProperty("dog_2_name");
  expect(edited.answers).not.toHaveProperty("dog_3_name");
});
