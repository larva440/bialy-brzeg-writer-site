import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { getPostBundle } from "@/lib/posts";

export const Route = createFileRoute("/hakerdoor/$date/$series/$slug")({
  loader: async ({ params }) => {
    const bundle = await getPostBundle({
      data: { series: params.series, slug: params.slug, preview: params.date },
    });
    if (!bundle) throw notFound();
    return bundle;
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} — Biały Brzeg` : "Biały Brzeg";
    return {
      meta: [{ title }, { name: "robots", content: "noindex, nofollow" }],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-serif text-3xl text-ink">Nie znaleziono wpisu</h1>
        <Link
          to="/"
          className="mt-8 inline-block border-b border-ink pb-1 text-sm uppercase tracking-[0.25em]"
        >
          Wróć
        </Link>
      </div>
    </SiteLayout>
  ),
  component: PreviewPostPage,
});

function PreviewPostPage() {
  const { date } = Route.useParams();
  const { meta, post, prev, next } = Route.useLoaderData();
  const seriesSlug = meta?.slug ?? post.series;
  const seriesName = meta?.name ?? seriesSlug;

  return (
    <SiteLayout>
      <article className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <Link
          to="/hakerdoor/$date/$series"
          params={{ date, series: seriesSlug }}
          className="mb-12 inline-block text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-ink"
        >
          ← {seriesName}
        </Link>
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {post.dateLabel} · podgląd {date}
        </p>
        <h1 className="mb-12 font-serif text-3xl leading-tight text-ink md:text-5xl">
          {post.title}
        </h1>
        <div className="prose-literary">
          {post.content.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <nav className="mt-20 flex justify-between gap-6 border-t border-rule/70 pt-8 text-sm">
          <div>
            {prev && (
              <Link
                to="/hakerdoor/$date/$series/$slug"
                params={{ date, series: seriesSlug, slug: prev.slug }}
                className="block text-muted-foreground hover:text-ink"
              >
                <span className="block text-xs uppercase tracking-[0.25em]">
                  Poprzedni
                </span>
                <span className="mt-1 block font-serif text-base text-ink">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link
                to="/hakerdoor/$date/$series/$slug"
                params={{ date, series: seriesSlug, slug: next.slug }}
                className="block text-muted-foreground hover:text-ink"
              >
                <span className="block text-xs uppercase tracking-[0.25em]">
                  Następny
                </span>
                <span className="mt-1 block font-serif text-base text-ink">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </SiteLayout>
  );
}
