import { createServerFn } from "@tanstack/react-start";

export type Post = {
  slug: string;
  title: string;
  date: string; // "YYYY-MM-DD" — zaplanowana data publikacji
  dateLabel: string;
  excerpt: string;
  keywords?: string[];
  content: string[];
  series: string;
};

export type SeriesMeta = {
  slug: string;
  name: string;
  heading: string;
  description: string;
  order: number;
};

function deslug(s: string): string {
  return s
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

// Skanuje WSZYSTKIE podfoldery. Seria = nazwa folderu. Tylko po stronie serwera,
// dlatego treść przyszłych wpisów nie trafia do przeglądarki.
function readContent(): {
  posts: Post[];
  meta: Record<string, Partial<SeriesMeta>>;
} {
  const modules = import.meta.glob("../content/posts/*/*.json", { eager: true });
  const posts: Post[] = [];
  const meta: Record<string, Partial<SeriesMeta>> = {};
  for (const [path, mod] of Object.entries(modules)) {
    const parts = path.split("/");
    const series = parts[parts.indexOf("posts") + 1];
    const file = parts[parts.length - 1];
    const data: any = (mod as any).default ?? mod;
    if (file === "_series.json") {
      meta[series] = data;
    } else if (!file.startsWith("_")) {
      posts.push({ ...(data as Omit<Post, "series">), series });
    }
  }
  return { posts, meta };
}

function seriesList(): SeriesMeta[] {
  const { posts, meta } = readContent();
  const slugs = new Set<string>(posts.map((p) => p.series));
  Object.keys(meta).forEach((s) => slugs.add(s));
  return [...slugs]
    .map((slug) => ({
      slug,
      name: meta[slug]?.name ?? deslug(slug),
      heading: meta[slug]?.heading ?? "",
      description: meta[slug]?.description ?? "",
      order: meta[slug]?.order ?? 999,
    }))
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

function published(series: string, now: Date): Post[] {
  const { posts } = readContent();
  return posts
    .filter((p) => p.series === series)
    .filter((p) => new Date(p.date + "T00:00:00Z").getTime() <= now.getTime())
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

function resolveNow(preview?: string): Date {
  if (preview) {
    const m = /^(\d{4})(\d{2})(\d{2})$/.exec(preview);
    if (m) {
      const d = new Date(`${m[1]}-${m[2]}-${m[3]}T23:59:59Z`);
      if (!Number.isNaN(d.getTime())) return d;
    }
  }
  return new Date();
}

export const getAllSeries = createServerFn({ method: "GET" }).handler(
  async () => seriesList(),
);

export const getSeriesPage = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => input as { series: string; preview?: string })
  .handler(async ({ data }) => {
    const meta = seriesList().find((s) => s.slug === data.series) ?? null;
    if (!meta) return null;
    return { meta, posts: published(data.series, resolveNow(data.preview)) };
  });

export const getPostBundle = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => input as { series: string; slug: string; preview?: string })
  .handler(async ({ data }) => {
    const now = resolveNow(data.preview);
    const list = published(data.series, now);
    const idx = list.findIndex((p) => p.slug === data.slug);
    if (idx === -1) return null;
    const meta = seriesList().find((s) => s.slug === data.series) ?? null;
    return {
      meta,
      post: list[idx],
      prev: list[idx + 1] ?? null,
      next: list[idx - 1] ?? null,
    };
  });

