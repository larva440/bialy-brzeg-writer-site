import { createServerFn } from "@tanstack/react-start";
type D1Bound = {
  first: <T = Record<string, unknown>>() => Promise<T | null>;
  run: () => Promise<unknown>;
};
type D1Like = {
  prepare: (sql: string) => { bind: (...args: unknown[]) => D1Bound };
};

async function getDB(): Promise<D1Like | null> {
  try {
    const mod = await import(/* @vite-ignore */ "cloudflare:workers");
    const fromCf = (mod as { env?: { DB?: D1Like } }).env?.DB;
    if (fromCf) return fromCf;
  } catch {
    /* nie jesteśmy w środowisku Workers — używamy fallbacku */
  }
  const g = (globalThis as Record<string, unknown>).__cfEnv as
    | { DB?: D1Like }
    | undefined;
  return g?.DB ?? null;
}


// Odczyt licznika (nie zmienia danych).
export const getViewCount = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => input as { series: string; slug: string })
  .handler(async ({ data }) => {
    const db = await getDB();
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
    const db = await getDB();
    if (!db) return 0;
    const row = await db
      .prepare(
        "INSERT INTO views (series, slug, count) VALUES (?, ?, 1) ON CONFLICT(series, slug) DO UPDATE SET count = count + 1 RETURNING count",
      )
      .bind(data.series, data.slug)
      .first<{ count: number }>();
    return row?.count ?? 1;
  });
