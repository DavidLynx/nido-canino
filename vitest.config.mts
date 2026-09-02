import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: { alias: {
    "@": fileURLToPath(new URL(".", import.meta.url)),
    "server-only": fileURLToPath(new URL("./tests/request/server-only.ts", import.meta.url)),
  } },
  test: { include: ["tests/request/**/*.test.{ts,tsx}"], setupFiles: ["./tests/request/setup.ts"], restoreMocks: true },
});
