import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    cloudflare: {
      d1Databases: [
        {
          binding: "DB",
          database_name: "bialybrzeg",
          database_id: "b48e4047-5a31-4202-9d01-c8bffa822704",
        },
      ],
    } as Record<string, unknown>,
  },
} as Parameters<typeof defineConfig>[0]);
