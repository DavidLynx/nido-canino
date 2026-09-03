import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { expect, test } from "@playwright/test";
import { legacyDraft } from "../legacy-fixture/fixture";
import { envelopeSchema } from "../legacy-fixture/contract";
import { buildLynxPayload } from "../legacy-fixture/payload";
import { envelope } from "../fixtures";
import type * as LegacyBundle from "../legacy-fixture/browser";

declare global {
  interface Window {
    LegacyRequest: typeof LegacyBundle;
    oldAttempts: ReturnType<typeof LegacyBundle.createAttempt>[];
    oldWindowMarker: string;
  }
}

// Existing Vitest installs Vite; bundle in memory without adding dependencies/artifacts.
async function legacyBundle(): Promise<string> {
  const require = createRequire(pathToFileURL(`${process.cwd()}/package.json`));
  const resolveVite = createRequire(require.resolve("vitest/package.json"));
  const { build } = await import(pathToFileURL(resolveVite.resolve("vite")).href);
  const output = await build({ configFile: false, logLevel: "silent", build: { write: false, minify: false,
    lib: { entry: "tests/request/legacy-fixture/browser.ts", name: "LegacyRequest", formats: ["iife"] } } });
  return output[0].output.find((entry: { type: string }) => entry.type === "chunk").code;
}

test("legacy bundle stays open across publication + API switch, refined coexists, cutoff preserves exact replay", async ({ page, request, baseURL }) => {
  const mock = `http://127.0.0.1:${process.env.NIDO_E2E_MOCK_PORT || 4319}`;
  const state = async (publishedVersion: number, legacyClosed = false) => {
    expect((await request.post(`${mock}/__rollout`, { data: { publishedVersion, legacyClosed } })).status()).toBe(204);
  };
  await page.route("**/*", route => new URL(route.request().url()).origin === baseURL ? route.continue() : route.abort());
  await state(1);
  try {
    // STATE A: exact historic client+contract, with the historic API parse/build boundary.
    await page.route("**/legacy-open-tab", route => route.fulfill({ contentType: "text/html", body: "<!doctype html><title>Frozen legacy request tab</title><main>Legacy tab retained in memory</main>" }));
    await page.route("**/api/request", async route => {
      const input = envelopeSchema.parse(route.request().postDataJSON());
      const response = await request.post(`${mock}/intake`, { headers: { Authorization: "Bearer TEST-ID.TEST-NOT-A-SECRET" }, data: buildLynxPayload(input, input.policy_version) });
      const receipt = await response.json();
      await route.fulfill({ status: response.status(), json: { accepted: receipt.accepted, request_id: receipt.request_id } });
    });
    await page.goto("/legacy-open-tab");
    await page.addScriptTag({ content: await legacyBundle() });
    await page.evaluate(draft => {
      window.oldWindowMarker = crypto.randomUUID();
      const a = window.LegacyRequest.answersSchema.parse(draft);
      window.oldAttempts = Array.from({ length: 4 }, () => window.LegacyRequest.createAttempt(a, { landing_path: "/request?utm_source=legacy", utm_source: "legacy" }, "TEST-POLICY", new Date().toISOString()));
    }, legacyDraft());
    const retained = await page.evaluate(() => ({ marker: window.oldWindowMarker, attempts: window.oldAttempts }));
    const sendOld = (index: number) => page.evaluate(i => window.LegacyRequest.sendAttempt(window.oldAttempts[i]), index);
    // STEP 1: SQL suite tests the real bridge install; old API/client still succeeds here.
    expect(await sendOld(0)).toMatchObject({ accepted: true });
    // STEP 2: new published version, still the OLD Nido server/client, never cross to v2.
    await state(2);
    expect(await sendOld(1)).toMatchObject({ accepted: true });
    // STEP 3: remove ONLY the historical handler: same open document now posts to real NEW Next API.
    await page.unroute("**/api/request");
    expect(await sendOld(2)).toMatchObject({ accepted: true });
    expect(await sendOld(0)).toMatchObject({ accepted: true });
    const refined = { ...envelope({ preferred_channel: "phone" }), external_request_id: `nido-request-${crypto.randomUUID()}`, submitted_at: new Date().toISOString(), consent_accepted_at: new Date().toISOString() };
    expect((await request.post(`${baseURL}/api/request`, { data: refined })).status()).toBe(202);
    const receipts = await (await request.get(`${mock}/__receipts`)).json() as { id: string; version: number; hash: string }[];
    for (const attempt of retained.attempts.slice(0, 3)) {
      expect(receipts.find(r => r.id === attempt.external_request_id)).toMatchObject({ version: 1,
        hash: createHash("sha256").update(JSON.stringify(buildLynxPayload(envelopeSchema.parse(attempt), attempt.policy_version))).digest("hex") });
    }
    expect(receipts.find(r => r.id === refined.external_request_id)?.version).toBe(2);
    // STEP 4: cutoff rejects an UNSENT old attempt, not an already accepted replay.
    await state(2, true);
    expect(await sendOld(3)).toMatchObject({ accepted: false, code: "validation" });
    expect(await sendOld(2)).toMatchObject({ accepted: true });
    expect((await request.post(`${baseURL}/api/request`, { data: { ...refined, external_request_id: `nido-request-${crypto.randomUUID()}` } })).status()).toBe(202);
    expect(await page.evaluate(() => ({ marker: window.oldWindowMarker, attempts: window.oldAttempts }))).toEqual(retained);
    expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);
  } finally { await state(2); }
});
