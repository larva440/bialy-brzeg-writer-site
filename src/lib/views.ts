import { createServerFn } from "@tanstack/react-start";
import { env as cfEnv } from "cloudflare:workers";

type D1Bound = {
  first: <T = Record<string, unknown>>() => Promise<T | null>;
  run: () => Promise<unknown>;
};
type D1Like = {
  prepare: (sql: string) => { bind: (...args: unknown[]) => D1Bound };
};

function getDB(): D1Like | null {
  const fromCf = (cfEnv as { DB?: D1Like } | undefined)?.DB;
  if (fromCf) return fromCf;
  const g = (globalThis as Record<string, unknown>).__cfEnv as
    | { DB?: D1Like }
    | undefined;
  return g?.DB ?? null;
}


// Odczyt licznika (nie zmienia danych).
export const getViewCount = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => input as { series: string; slug: string })
  .handler(async ({ data }) => {
    const db = getDB();
    if (!db) return 0;
    const row = await db
      .prepare("SELECT count FROM views WHERE series = ? AND slug = ?")
      .bind(data.series, data.slug)
      .first<{ count: number }>();
    return row?.count ?? 0;
  });

// Inkrementacja + zwrot nowej wartości (upsert).
export const registerView = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input as { series: string; slug: string })
  .handler(async ({ data }) => {
    const db = getDB();
    if (!db) return 0;
    const row = await db
      .prepare(
        "INSERT INTO views (series, slug, count) VALUES (?, ?, 1) ON CONFLICT(series, slug) DO UPDATE SET count = count + 1 RETURNING count",
      )
      .bind(data.series, data.slug)
      .first<{ count: number }>();
    return row?.count ?? 1;
  });
