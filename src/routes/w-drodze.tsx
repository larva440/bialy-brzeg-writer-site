import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { posts } from "@/lib/posts";

export const Route = createFileRoute("/w-drodze")({
  head: () => ({
    meta: [
      { title: "W Drodze — Biały Brzeg" },
      { name: "description", content: "Krótkie eseje o kryzysie, pamięci i powrocie. Blog Białego Brzegu." },
      { property: "og:title", content: "W Drodze — Biały Brzeg" },
      { property: "og:description", content: "Krótkie eseje o kryzysie, pamięci i powrocie." },
    ],
  }),
  component: WDrodzeLayout,
});

function WDrodzeLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/w-drodze/$slug");
  if (isChild) return <Outlet />;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          W Drodze
        </p>
        <h1 className="mb-16 font-serif text-3xl text-ink md:text-4xl">
          Krótkie eseje. Zapisy z drogi.
        </h1>
        <ul className="divide-y divide-rule/70">
          {posts.map((post) => (
            <li key={post.slug} className="py-10 first:pt-0">
              <Link
                to="/w-drodze/$slug"
                params={{ slug: post.slug }}
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
