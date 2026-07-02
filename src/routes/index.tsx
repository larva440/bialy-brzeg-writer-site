import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Biały Brzeg" },
      { name: "description", content: "Teksty o kryzysie, pamięci i zamkniętych systemach. O odzyskiwaniu zdolności do wątpienia we własną pewność." },
      { property: "og:title", content: "Biały Brzeg" },
      { property: "og:description", content: "Teksty o kryzysie, pamięci i zamkniętych systemach." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <section className="mx-auto flex min-h-[80vh] max-w-3xl flex-col justify-center px-6 py-24">
        <p className="mb-10 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Biały Brzeg — pseudonim literacki
        </p>
        <h1 className="font-serif text-4xl leading-[1.15] text-ink md:text-6xl md:leading-[1.1]">
          „Na pewno - było właśnie tą chorobą.”
        </h1>
        <p className="mt-10 max-w-xl font-serif text-lg leading-relaxed text-ink-soft md:text-xl">
          Teksty o kryzysie, pamięci i zamkniętych systemach. O odzyskiwaniu
          zdolności do wątpienia we własną pewność.
        </p>
        <div className="mt-14">
          <Link
            to="/$series"
            params={{ series: "dziennik" }}
            className="group inline-flex items-center gap-3 border-b border-ink pb-1 text-sm uppercase tracking-[0.25em] text-ink"
          >
            Dziennik
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
