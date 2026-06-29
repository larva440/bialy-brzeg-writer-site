import { useEffect, useState } from "react";
import { getViewCount, registerView } from "@/lib/views";

export function DebugOverlay({ series, slug }: { series: string; slug: string }) {
  const [lines, setLines] = useState<string[]>(["[DEBUG] mount"]);

  const log = (msg: string) => {
    console.log(msg);
    setLines((prev) => [...prev, msg]);
  };

  useEffect(() => {
    log(`[DEBUG] useEffect fired. series=${series} slug=${slug}`);
    const key = `bb_viewed:${series}:${slug}`;
    let already = false;
    try {
      already = sessionStorage.getItem(key) === "1";
    } catch (e) {
      log(`[DEBUG] sessionStorage error: ${e}`);
    }
    log(`[DEBUG] already=${already}`);

    (async () => {
      try {
        log("[DEBUG] wywołuję registerView...");
        const n = await registerView({ data: { series, slug } });
        log(`[DEBUG] registerView zwróciło: ${JSON.stringify(n)}`);
      } catch (err) {
        log(`[DEBUG] registerView BŁĄD: ${err}`);
      }

      try {
        log("[DEBUG] wywołuję getViewCount...");
        const n2 = await getViewCount({ data: { series, slug } });
        log(`[DEBUG] getViewCount zwróciło: ${JSON.stringify(n2)}`);
      } catch (err) {
        log(`[DEBUG] getViewCount BŁĄD: ${err}`);
      }
    })();
  }, [series, slug]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(0,0,0,0.85)",
        color: "#0f0",
        fontFamily: "monospace",
        fontSize: "12px",
        padding: "8px",
        zIndex: 9999,
        maxHeight: "200px",
        overflowY: "auto",
      }}
    >
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
}
