// Współdzielony WeakMap: Request → Cloudflare env
// Działa bo server.ts i views.ts są w tym samym module graph (jeden bundle SSR)
const envMap = new WeakMap<object, Record<string, unknown>>();

let _lastEnv: Record<string, unknown> | null = null;

export function setCfEnv(req: Request, env: unknown): void {
  const e = env as Record<string, unknown>;
  _lastEnv = e;
  envMap.set(req, e);
}

export function getCfEnv(): Record<string, unknown> | null {
  return _lastEnv;
}
