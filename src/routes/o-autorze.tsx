import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/o-autorze")({
  head: () => ({
    meta: [
      { title: "O autorze — Biały Brzeg" },
      { name: "description", content: "Biały Brzeg to pseudonim. O pisaniu z miejsca spokoju o czasie, gdy spokoju nie było." },
      { property: "og:title", content: "O autorze — Biały Brzeg" },
      { property: "og:description", content: "Biały Brzeg to pseudonim. O pisaniu z miejsca spokoju o czasie, gdy spokoju nie było." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          O autorze
        </p>
        <h1 className="mb-12 font-serif text-3xl text-ink md:text-4xl">
          Biały Brzeg
        </h1>
        <div className="prose-literary">
          <p>
            Biały Brzeg to pseudonim. Piszę o rzeczach, które się wydarzyły,
            tak jak je pamiętam — bez upiększania.
          </p>
          <p>
            Przez pewien czas byłem w środku zamkniętego systemu, który
            tłumaczył mi, że moje wątpliwości to mój opór. Wyszedłem. Piszę
            o tym, jak takie miejsce wciąga zwykłego człowieka, i o drzwiach,
            które przez cały czas są otwarte od środka — tylko nie zawsze się
            je widzi.
          </p>
          <p>
            Interesuje mnie pamięć, która dokręca zakończenia, i pewność,
            która potrafi być chorobą. Piszę z miejsca spokoju o czasie, gdy
            spokoju nie było.
          </p>
          <p>
            Piszę krótkie i dłuższe formy.
          </p>
        </div>
      </article>
    </SiteLayout>
  );
}
