import { afterEach, beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(() => { throw new Error("Network disabled in request tests. Supply a mock."); }));
});
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
