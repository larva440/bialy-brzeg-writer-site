import {
  createFileRoute,
  Link,
  Outlet,
  notFound,
  useMatches,
} from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { getSeriesPage, type Post } from "@/lib/posts";

export const Route = createFileRoute("/$series")({
  loader: async ({ params }) => {
    const data = await getSeriesPage({ data: params.series });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    const meta = loaderData?.meta;
    const title = meta ? `${meta.name} — Biały Brzeg` : "Biały Brzeg";
    const desc = meta?.description ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
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
  component: SeriesLayout,
});

function SeriesLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/$series/$slug");
  if (isChild) return <Outlet />;

  const { meta, posts } = Route.useLoaderData();

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {meta.name}
        </p>
        <h1 className="mb-16 font-serif text-3xl text-ink md:text-4xl">
          {meta.heading || meta.name}
        </h1>
        <ul className="divide-y divide-rule/70">
          {posts.map((post: Post) => (
            <li key={post.slug} className="py-10 first:pt-0">
              <Link
                to="/$series/$slug"
                params={{ series: meta.slug, slug: post.slug }}
                className="group block"
              >
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {post.dateLabel}
                </p>
                <h2 className="font-serif text-2xl text-ink transition-colors group-hover:text-ink-soft md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-4 font-serif text-base leading-relaxed text-ink-soft md:text-lg">
                  {post.excerpt}
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
