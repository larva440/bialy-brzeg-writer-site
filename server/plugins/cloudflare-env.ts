import { defineNitroPlugin } from "nitro/runtime";

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    const cfEnv = (event.context as Record<string, unknown>).cloudflare as
      | { env?: Record<string, unknown> }
      | undefined;
    if (cfEnv?.env) {
      (globalThis as Record<string, unknown>).__cfEnv = cfEnv.env;
    }
  });
});
