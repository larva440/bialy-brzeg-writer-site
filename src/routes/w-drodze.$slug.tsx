import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { getPost, posts } from "@/lib/posts";

export const Route = createFileRoute("/w-drodze/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} — Biały Brzeg` : "W Drodze — Biały Brzeg";
    const desc = post?.excerpt ?? "Wpis z bloga Białego Brzegu.";
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
        <Link to="/w-drodze" className="mt-8 inline-block border-b border-ink pb-1 text-sm uppercase tracking-[0.25em]">
          Wróć do listy
        </Link>
      </div>
    </SiteLayout>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const prev = posts[idx + 1];
  const next = posts[idx - 1];

  return (
    <SiteLayout>
      <article className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <Link
          to="/w-drodze"
          className="mb-12 inline-block text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-ink"
        >
          ← W Drodze
        </Link>
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {post.dateLabel}
        </p>
        <h1 className="mb-12 font-serif text-3xl leading-tight text-ink md:text-5xl">
          {post.title}
        </h1>
        <div className="prose-literary">
          {post.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <nav className="mt-20 flex justify-between gap-6 border-t border-rule/70 pt-8 text-sm">
          <div>
            {prev && (
              <Link
                to="/w-drodze/$slug"
                params={{ slug: prev.slug }}
                className="block text-muted-foreground hover:text-ink"
              >
                <span className="block text-xs uppercase tracking-[0.25em]">Poprzedni</span>
                <span className="mt-1 block font-serif text-base text-ink">{prev.title}</span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link
                to="/w-drodze/$slug"
                params={{ slug: next.slug }}
                className="block text-muted-foreground hover:text-ink"
              >
                <span className="block text-xs uppercase tracking-[0.25em]">Następny</span>
                <span className="mt-1 block font-serif text-base text-ink">{next.title}</span>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </SiteLayout>
  );
}
