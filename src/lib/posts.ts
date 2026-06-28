import { createServerFn } from "@tanstack/react-start";

export type Post = {
  slug: string;
  title: string;
  date: string; // "YYYY-MM-DD" — zaplanowana data publikacji
  dateLabel: string;
  excerpt: string;
  content: string[];
};

// Wczytuje WSZYSTKIE pliki wpisów (także przyszłe). Używane wyłącznie wewnątrz
// handlerów serwerowych poniżej, żeby treść przyszłych wpisów nie trafiała do klienta.
function loadAllPosts(): Post[] {
  const modules = import.meta.glob("../content/posts/*.json", { eager: true });
  return Object.values(modules).map((m: any) => (m.default ?? m) as Post);
}

function published(now: Date): Post[] {
  return loadAllPosts()
    .filter((p) => new Date(p.date + "T00:00:00Z").getTime() <= now.getTime())
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export const getPublishedPosts = createServerFn({ method: "GET" }).handler(
  async () => {
    return published(new Date());
  },
);

export const getPostBundle = createServerFn({ method: "GET" })
  .inputValidator((slug: unknown) => String(slug))
  .handler(async ({ data: slug }) => {
    const list = published(new Date());
    const idx = list.findIndex((p) => p.slug === slug);
    if (idx === -1) return null;
    return {
      post: list[idx],
      prev: list[idx + 1] ?? null,
      next: list[idx - 1] ?? null,
    };
  });
