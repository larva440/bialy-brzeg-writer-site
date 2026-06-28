import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { getPostBundle } from "@/lib/posts";

export const Route = createFileRoute("/$series/$slug")({
  validateSearch: (s: Record<string, unknown>) => ({
    hakerDoor: typeof s.hakerDoor === "string" ? s.hakerDoor : undefined,
  }),
  loaderDeps: ({ search }) => ({ hakerDoor: search.hakerDoor }),
  loader: async ({ params, deps }) => {
    const bundle = await getPostBundle({
      data: { series: params.series, slug: params.slug, preview: deps.hakerDoor },
    });
    if (!bundle) throw notFound();
    return bundle;
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} — Biały Brzeg` : "Biały Brzeg";
    const desc = post?.excerpt ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
      ],
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
  component: PostPage,
});

function PostPage() {
  const { meta, post, prev, next } = Route.useLoaderData();
  const seriesSlug = meta?.slug ?? post.series;
  const seriesName = meta?.name ?? seriesSlug;

  return (
    <SiteLayout>
      <article className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <Link
          to="/$series"
          params={{ series: seriesSlug }}
          search={(prev) => prev}
          className="mb-12 inline-block text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-ink"
        >
          ← {seriesName}
        </Link>
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {post.dateLabel}
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
                to="/$series/$slug"
                params={{ series: seriesSlug, slug: prev.slug }}
                search={(prev) => prev}
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
                to="/$series/$slug"
                params={{ series: seriesSlug, slug: next.slug }}
                search={(prev) => prev}
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
        <p className="mt-16 text-center text-xs leading-relaxed text-muted-foreground">
          Jeśli mierzysz się z kryzysem — Centrum Wsparcia dla osób w kryzysie
          psychicznym:{" "}
          <a href="tel:+48800702222" className="underline-offset-4 hover:underline">
            800 70 2222
          </a>{" "}
          (całodobowo, bezpłatnie).
        </p>
      </article>
    </SiteLayout>
  );
}
