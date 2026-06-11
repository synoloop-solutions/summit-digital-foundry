import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb { label: string; to?: string; }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--navy-deep)]">
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="inline-flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            {c.to ? <Link to={c.to as never} className="hover:text-[var(--navy-deep)]">{c.label}</Link> : <span className="text-foreground">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
