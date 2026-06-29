import {
  createFileRoute,
  Link,
  Outlet,
  notFound,
  useMatches,
} from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { getSeriesPage, type Post } from "@/lib/posts";

function teaserText(post: Post): string {
  const src = (post.content?.[0] ?? post.excerpt ?? "").trim();
  const MAX = 220;
  if (src.length <= MAX) return src;
  const slice = src.slice(0, MAX);
  const sp = slice.lastIndexOf(" ");
  return slice.slice(0, sp > 80 ? sp : MAX).replace(/[\s.,;:—–-]+$/u, "");
}

function readingTime(post: Post): string {
  const words = (post.content ?? [])
    .join(" ")
    .split(/\s+/u)
    .filter(Boolean).length;
  const min = Math.max(1, Math.round(words / 200));
  const last = min % 10;
  const last2 = min % 100;
  const unit =
    min === 1
      ? "minuta"
      : last >= 2 && last <= 4 && (last2 < 12 || last2 > 14)
        ? "minuty"
        : "minut";
  return `${min} ${unit} czytania`;
}

export const Route = createFileRoute("/hakerdoor/$date/$series")({
  loader: async ({ params }) => {
    const data = await getSeriesPage({
      data: { series: params.series, preview: params.date },
    });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    const meta = loaderData?.meta;
    const title = meta ? `${meta.name} — Biały Brzeg` : "Biały Brzeg";
    return {
      meta: [{ title }, { name: "robots", content: "noindex, nofollow" }],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-serif text-3xl text-ink">Nie znaleziono serii</h1>
        <Link
          to="/"
          className="mt-8 inline-block border-b border-ink pb-1 text-sm uppercase tracking-[0.25em]"
        >
          Wróć
        </Link>
      </div>
    </SiteLayout>
  ),
  component: PreviewSeriesLayout,
});

function PreviewSeriesLayout() {
  const matches = useMatches();
  const { date } = Route.useParams();
  const { meta, posts } = Route.useLoaderData();
  const isChild = matches.some(
    (m) => m.routeId === "/hakerdoor/$date/$series/$slug",
  );
  if (isChild) return <Outlet />;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {meta.name} · podgląd {date}
        </p>
        <h1 className="mb-16 font-serif text-3xl text-ink md:text-4xl">
          {meta.heading || meta.name}
        </h1>
        <ul className="divide-y divide-rule/70">
          {posts.map((post: Post) => (
            <li key={post.slug} className="py-10 first:pt-0">
              <Link
                to="/hakerdoor/$date/$series/$slug"
                params={{ date, series: meta.slug, slug: post.slug }}
                className="group block"
              >
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {post.dateLabel} · {readingTime(post)}
                </p>
                <h2 className="font-serif text-3xl text-ink transition-colors group-hover:text-ink-soft md:text-4xl">
                  {post.title}
                </h2>
                <p className="mt-4 font-serif text-base leading-relaxed text-ink-soft md:text-lg">
                  „{teaserText(post)}…”
                </p>
                <span className="mt-4 inline-block text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors group-hover:text-ink">
                  Czytaj →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
