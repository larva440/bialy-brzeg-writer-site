import { Link, useLoaderData } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { SeriesMeta } from "@/lib/posts";

function NavLink({
  to,
  params,
  children,
}: {
  to: string;
  params?: Record<string, string>;
  children: ReactNode;
}) {
  return (
    <Link
      to={to as any}
      params={params as any}
      className="text-sm tracking-wide text-ink-soft transition-colors hover:text-ink"
      activeProps={{ className: "text-ink" }}
      activeOptions={{ exact: to === "/" }}
    >
      {children}
    </Link>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();
  const series = (useLoaderData({ from: "__root__" as any }) ??
    []) as SeriesMeta[];

  return (
    <div className="flex min-h-screen flex-col bg-paper text-foreground">
      <header className="border-b border-rule/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 md:py-8">
          <Link to="/" className="font-serif text-lg tracking-tight text-ink">
            Biały Brzeg
          </Link>
          <nav className="flex items-center gap-6 md:gap-10">
            <NavLink to="/o-autorze">O autorze</NavLink>
            {series.map((s) => (
              <NavLink key={s.slug} to="/$series" params={{ series: s.slug }}>
                {s.name}
              </NavLink>
            ))}
            <NavLink to="/kontakt">Kontakt</NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-rule/60">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center">
          <span className="font-serif text-ink">Biały Brzeg</span>
          <span>© {year}</span>
          <Link to="/kontakt" className="hover:text-ink">
            Kontakt
          </Link>
        </div>
      </footer>
    </div>
  );
}
