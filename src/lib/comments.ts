import { createServerFn } from "@tanstack/react-start";

type D1Result<T> = { results: T[] };
type D1Bound = {
  first: <T = Record<string, unknown>>() => Promise<T | null>;
  all: <T = Record<string, unknown>>() => Promise<D1Result<T>>;
  run: () => Promise<unknown>;
};
type D1Like = {
  prepare: (sql: string) => { bind: (...args: unknown[]) => D1Bound };
};

function getDB(): D1Like | null {
  const e = (globalThis as Record<string, unknown>).__env__ as
    | { DB?: D1Like }
    | undefined;
  return e?.DB ?? null;
}

export type Comment = {
  id: number;
  author: string;
  body: string;
  created_at: number;
};

export const getComments = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => input as { series: string; slug: string })
  .handler(async ({ data }) => {
    const db = getDB();
    if (!db) return [] as Comment[];
    const res = await db
      .prepare(
        "SELECT id, author, body, created_at FROM comments WHERE series = ? AND slug = ? AND approved = 1 ORDER BY created_at DESC LIMIT 200",
      )
      .bind(data.series, data.slug)
      .all<Comment>();
    return res.results ?? [];
  });

export const addComment = createServerFn({ method: "POST" })
  .inputValidator(
    (input: unknown) =>
      input as {
        series: string;
        slug: string;
        author: string;
        body: string;
        website?: string;
      },
  )
  .handler(async ({ data }) => {
    if (data.website && data.website.trim() !== "") {
      return { ok: true as const };
    }

    const author = (data.author ?? "").trim();
    const body = (data.body ?? "").trim();

    if (author.length < 2 || author.length > 40) {
      return { ok: false as const, error: "Podpis: 2–40 znaków." };
    }
    if (body.length < 3 || body.length > 2000) {
      return { ok: false as const, error: "Komentarz: 3–2000 znaków." };
    }

    const db = getDB();
    if (!db) return { ok: false as const, error: "Baza niedostępna." };

    const now = Date.now();
    const recent = await db
      .prepare(
        "SELECT created_at FROM comments WHERE series = ? AND slug = ? ORDER BY created_at DESC LIMIT 1",
      )
      .bind(data.series, data.slug)
      .first<{ created_at: number }>();
    if (recent && now - recent.created_at < 30_000) {
      return { ok: false as const, error: "Chwila — poczekaj kilka sekund." };
    }

    await db
      .prepare(
        "INSERT INTO comments (series, slug, author, body, approved, created_at) VALUES (?, ?, ?, ?, 1, ?)",
      )
      .bind(data.series, data.slug, author, body, now)
      .run();

    return { ok: true as const };
  });
