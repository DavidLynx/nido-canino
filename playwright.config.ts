import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/request/e2e", fullyParallel: false, workers: 1,
  timeout: 90_000,
  use: { baseURL: "http://127.0.0.1:4318", browserName: "chromium", trace: "retain-on-failure" },
  webServer: [
    { command: "node tests/request/mock-lynx.mjs", url: "http://127.0.0.1:4319/health", reuseExistingServer: false, env: { NIDO_TEST_MOCK: "1" } },
    { command: "pnpm dev --hostname 127.0.0.1 --port 4318", url: "http://127.0.0.1:4318/request", reuseExistingServer: false, timeout: 180_000,
      env: { LYNX_PUBLIC_INTAKE_URL: "http://127.0.0.1:4319/intake", LYNX_NIDO_AUTHORIZATION: "Bearer TEST-ID.TEST-NOT-A-SECRET", NIDO_PRIVACY_POLICY_VERSION: "TEST-POLICY", NIDO_PRIVACY_POLICY_URL: "https://example.test/privacy" } },
  ],
});
