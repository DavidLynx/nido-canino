import "server-only";

export type PrivacyPolicy = { version: string; url: string };

export function getPrivacyPolicy(env: NodeJS.ProcessEnv = process.env): PrivacyPolicy | null {
  const version = env.NIDO_PRIVACY_POLICY_VERSION?.trim();
  const value = env.NIDO_PRIVACY_POLICY_URL?.trim();
  if (!version || version.length > 160 || !value || (env.NODE_ENV === "production" && version === "TEST-POLICY")) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.hash) return null;
    return { version, url: url.href };
  } catch { return null; }
}

export function getIntakeConfig(env: NodeJS.ProcessEnv = process.env) {
  const policy = getPrivacyPolicy(env);
  const authorization = env.LYNX_NIDO_AUTHORIZATION?.trim();
  if (!policy || !authorization || !/^Bearer [^\s.]+\.[^\s]+$/.test(authorization)) return null;
  try {
    const url = new URL(env.LYNX_PUBLIC_INTAKE_URL || "https://lynx-business-os.vercel.app/api/v1/public-intake/nido-website");
    const localMock = env.NODE_ENV !== "production" && url.protocol === "http:" && ["127.0.0.1", "localhost", "[::1]"].includes(url.hostname);
    if ((url.protocol !== "https:" && !localMock) || url.username || url.password || url.hash) return null;
    return { policy, authorization, url: url.href };
  } catch { return null; }
}
