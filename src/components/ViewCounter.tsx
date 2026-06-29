import { useEffect, useState } from "react";
import { getViewCount, registerView } from "@/lib/views";

function odslonyWord(n: number): string {
  const last = n % 10;
  const last2 = n % 100;
  if (n === 1) return "odsłona";
  if (last >= 2 && last <= 4 && (last2 < 12 || last2 > 14)) return "odsłony";
  return "odsłon";
}

export function ViewCounter({
  series,
  slug,
}: {
  series: string;
  slug: string;
}) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const key = `bb_viewed:${series}:${slug}`;
    let already = false;
    try {
      already = sessionStorage.getItem(key) === "1";
    } catch {
      already = false;
    }
    (async () => {
      try {
        let n: number;
        if (already) {
          n = await getViewCount({ data: { series, slug } });
        } else {
          n = await registerView({ data: { series, slug } });
          try {
            sessionStorage.setItem(key, "1");
          } catch {
            /* brak sessionStorage — trudno */
          }
        }
        if (!cancelled) setCount(n);
      } catch {
        /* licznik to ozdoba — nie blokujemy strony */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [series, slug]);

  if (count === null) return null;
  return (
    <span>
      {" · "}
      {count} {odslonyWord(count)}
    </span>
  );
}
