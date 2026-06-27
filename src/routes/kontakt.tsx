import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Biały Brzeg" },
      { name: "description", content: "Napisz do Białego Brzegu." },
      { property: "og:title", content: "Kontakt — Biały Brzeg" },
      { property: "og:description", content: "Napisz do Białego Brzegu." },
    ],
  }),
  component: Kontakt,
});

// TODO: wstaw własny klucz z https://web3forms.com
const WEB3FORMS_ACCESS_KEY = "[ACCESS_KEY]";

type Status = "idle" | "loading" | "success" | "error";

function Kontakt() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "Wiadomość ze strony Biały Brzeg");
    formData.append("from_name", "bialybrzeg.com");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success !== false) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(data?.message ?? "Coś poszło nie tak. Spróbuj ponownie.");
      }
    } catch {
      setStatus("error");
      setError("Brak połączenia. Spróbuj ponownie za chwilę.");
    }
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-xl px-6 py-24 md:py-32">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Kontakt
        </p>
        <h1 className="mb-8 font-serif text-3xl text-ink md:text-4xl">
          Napisz.
        </h1>
        <p className="mb-12 font-serif text-lg leading-relaxed text-ink-soft">
          Odpowiadam, gdy mogę. Bez deklaracji co do terminu.
        </p>

        {status === "success" ? (
          <div className="border border-rule p-8 text-center">
            <p className="font-serif text-xl text-ink">Wiadomość wysłana.</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Dziękuję. Odezwę się, jeśli będę miał co odpowiedzieć.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 border-b border-ink pb-1 text-xs uppercase tracking-[0.25em] text-ink"
            >
              Napisz jeszcze raz
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-8">
            {/* honeypot */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <Field label="Imię" name="name" type="text" required />
            <Field label="E-mail" name="email" type="email" required />
            <FieldArea label="Wiadomość" name="message" required />

            {status === "error" && error && (
              <p className="text-sm text-ink">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="border-b border-ink pb-1 text-sm uppercase tracking-[0.25em] text-ink transition-opacity hover:opacity-70 disabled:opacity-40"
            >
              {status === "loading" ? "Wysyłam…" : "Wyślij"}
            </button>
          </form>
        )}

        <p className="mt-16 border-t border-rule/70 pt-8 text-sm text-muted-foreground">
          Albo bezpośrednio:{" "}
          <a href="mailto:kontakt@bialybrzeg.com" className="text-ink underline underline-offset-4">
            kontakt@bialybrzeg.com
          </a>
        </p>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border-b border-rule bg-transparent py-2 font-serif text-lg text-ink outline-none transition-colors focus:border-ink"
      />
    </label>
  );
}

function FieldArea({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      <textarea
        name={name}
        required={required}
        rows={6}
        className="w-full resize-none border-b border-rule bg-transparent py-2 font-serif text-lg leading-relaxed text-ink outline-none transition-colors focus:border-ink"
      />
    </label>
  );
}
