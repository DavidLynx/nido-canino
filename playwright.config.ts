import { defineConfig } from "@playwright/test";

const port = Number(process.env.NIDO_E2E_PORT || 4318);
const mockPort = Number(process.env.NIDO_E2E_MOCK_PORT || 4319);
const useBuild = process.env.NIDO_E2E_USE_BUILD === "1";
const baseURL = `http://127.0.0.1:${port}`;
const mockURL = `http://127.0.0.1:${mockPort}`;

export default defineConfig({
  testDir: "./tests", testMatch: "**/e2e/*.spec.ts", fullyParallel: false, workers: 1,
  timeout: 90_000,
  use: { baseURL, browserName: "chromium", trace: "retain-on-failure" },
  webServer: [
    { command: "node tests/request/mock-lynx.mjs", url: `${mockURL}/health`, reuseExistingServer: false, env: { NIDO_TEST_MOCK: "1", NIDO_TEST_MOCK_PORT: String(mockPort) } },
    { command: `pnpm ${useBuild ? "start" : "dev"} --hostname 127.0.0.1 --port ${port}`, url: `${baseURL}/request`, reuseExistingServer: false, timeout: 180_000,
      env: { ...(useBuild ? { NODE_ENV: "test" } : {}), LYNX_BASE_URL: mockURL, LYNX_PUBLIC_INTAKE_URL: `${mockURL}/intake`, LYNX_NIDO_AUTHORIZATION: "Bearer TEST-ID.TEST-NOT-A-SECRET", NIDO_PRIVACY_POLICY_VERSION: "TEST-POLICY", NIDO_PRIVACY_POLICY_URL: "https://example.test/privacy" } },
  ],
});
