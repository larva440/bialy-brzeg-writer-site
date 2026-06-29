import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    cloudflare: {
      d1Databases: ["DB"],
    },
  },
} as Parameters<typeof defineConfig>[0]);
