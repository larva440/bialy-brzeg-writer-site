import { useEffect, useState } from "react";
import { getComments, addComment, type Comment } from "@/lib/comments";

function formatDate(ms: number): string {
  try {
    return new Intl.DateTimeFormat("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(ms));
  } catch {
    return "";
  }
}

function commentWord(n: number): string {
  const last = n % 10;
  const last2 = n % 100;
  if (n === 1) return "komentarz";
  if (last >= 2 && last <= 4 && (last2 < 12 || last2 > 14)) return "komentarze";
  return "komentarzy";
}

export function Comments({ series, slug }: { series: string; slug: string }) {
  const [list, setList] = useState<Comment[] | null>(null);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const c = await getComments({ data: { series, slug } });
        if (!cancelled) setList(c);
      } catch {
        if (!cancelled) setList([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [series, slug]);

  async function submit() {
    if (sending) return;
    setError(null);
    setSending(true);
    try {
      const res = await addComment({
        data: { series, slug, author, body, website },
      });
      if (res.ok) {
        setBody("");
        const c = await getComments({ data: { series, slug } });
        setList(c);
      } else {
        setError(res.error ?? "Nie udało się dodać komentarza.");
      }
    } catch {
      setError("Nie udało się dodać komentarza.");
    } finally {
      setSending(false);
    }
  }

  const count = list?.length ?? 0;

  return (
    <section className="mt-20 border-t border-rule/70 pt-8">
      <p className="mb-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {list === null ? "Komentarze" : `${count} ${commentWord(count)}`}
      </p>

      {list && list.length > 0 && (
        <ul className="mb-12 space-y-8">
          {list.map((c) => (
            <li key={c.id}>
              <div className="mb-1 flex items-baseline gap-3">
                <span className="font-serif text-base text-ink">{c.author}</span>
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {formatDate(c.created_at)}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-ink-soft">{c.body}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="space-y-4">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Podpis"
          maxLength={40}
          className="w-full border border-rule bg-transparent px-3 py-2 text-sm text-ink placeholder:text-muted-foreground focus:border-ink focus:outline-none"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Twój komentarz"
          rows={4}
          maxLength={2000}
          className="w-full resize-y border border-rule bg-transparent px-3 py-2 text-sm text-ink placeholder:text-muted-foreground focus:border-ink focus:outline-none"
        />
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
        />
        {error && <p className="text-sm text-ink">{error}</p>}
        <button
          type="button"
          onClick={submit}
          disabled={sending}
          className="border-b border-ink pb-1 text-xs uppercase tracking-[0.25em] text-ink transition-opacity hover:opacity-60 disabled:opacity-40"
        >
          {sending ? "Wysyłam…" : "Dodaj komentarz"}
        </button>
      </div>
    </section>
  );
}
