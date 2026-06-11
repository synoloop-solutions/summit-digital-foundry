import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/caseStudies";
import { insights } from "@/data/insights";
import { team } from "@/data/team";
import { images } from "@/data/images";

interface Hit { kind: string; title: string; href: string; params?: Record<string, string>; sub?: string; }

const index: Hit[] = [
  ...services.map((s) => ({ kind: "Service", title: s.name, href: "/services/$slug", params: { slug: s.slug }, sub: s.short })),
  ...industries.map((i) => ({ kind: "Industry", title: i.name, href: "/industries/$slug", params: { slug: i.slug }, sub: i.short })),
  ...caseStudies.map((c) => ({ kind: "Case study", title: c.title, href: "/case-studies/$slug", params: { slug: c.slug }, sub: c.summary })),
  ...insights.map((i) => ({ kind: "Insight", title: i.title, href: "/insights/$slug", params: { slug: i.slug }, sub: i.excerpt })),
  ...team.map((t) => ({ kind: "Team", title: t.name, href: "/team/$slug", params: { slug: t.slug }, sub: t.role })),
];

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Summit Advisory Group" },
      { name: "description", content: "Search across services, industries, case studies, insights, and team." },
      { property: "og:url", content: "/search" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q.trim()) return [];
    const term = q.toLowerCase();
    return index.filter((h) => (h.title + " " + (h.sub ?? "") + " " + h.kind).toLowerCase().includes(term)).slice(0, 40);
  }, [q]);
  return (
    <>
      <PageHero eyebrow="Search" title="Find what you need, fast" image={images.heroInsights} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "Search" }]} /></div>
      <section className="mx-auto max-w-3xl px-6 py-16">
        <label htmlFor="q" className="sr-only">Search</label>
        <Input id="q" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services, case studies, insights…" />
        <p className="mt-2 text-xs text-muted-foreground">{q ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Type to search across the site."}</p>
        <ul className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
          {results.map((h, i) => (
            <li key={i} className="p-4">
              <Link to={h.href as never} params={h.params as never} className="block">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{h.kind}</p>
                <h3 className="font-serif text-base text-[var(--navy-deep)]">{h.title}</h3>
                {h.sub && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{h.sub}</p>}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
