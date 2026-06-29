import { useState } from "react";

export function ShareBar({ title }: { title: string }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";

  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const twHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      /* brak clipboard — trudno */
    }
  }

  async function copyText() {
    const article = document.querySelector("article .prose-literary");
    const body = article ? (article as HTMLElement).innerText : "";
    const payload = `${title}\n\n${body}\n\n${url}`;
    try {
      await navigator.clipboard.writeText(payload);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      /* brak clipboard — trudno */
    }
  }

  const itemClass =
    "text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-ink";

  return (
    <div className="mt-16 border-t border-rule/70 pt-8">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Udostępnij
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href={fbHref} target="_blank" rel="noopener noreferrer" className={itemClass}>
          Facebook
        </a>
        <a href={twHref} target="_blank" rel="noopener noreferrer" className={itemClass}>
          X / Twitter
        </a>
        <button type="button" onClick={copyLink} className={itemClass}>
          {copiedLink ? "Skopiowano link ✓" : "Kopiuj link"}
        </button>
        <button type="button" onClick={copyText} className={itemClass}>
          {copiedText ? "Skopiowano tekst ✓" : "Kopiuj treść"}
        </button>
      </div>
    </div>
  );
}
