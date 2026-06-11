import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { caseStudies } from "@/data/caseStudies";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import { images } from "@/data/images";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Summit Advisory Group" },
      { name: "description", content: "Selected client work and measurable outcomes." },
      { property: "og:title", content: "Case Studies — Summit Advisory Group" },
      { property: "og:description", content: "Selected client work and measurable outcomes." },
      { property: "og:url", content: "/case-studies" },
      { property: "og:image", content: images.heroCases },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudiesIndex,
});

function CaseStudiesIndex() {
  const [industry, setIndustry] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    return caseStudies.filter((c) =>
      (!industry || c.industrySlug === industry) &&
      (!service || c.serviceSlug === service) &&
      (!q || (c.title + c.summary + c.client).toLowerCase().includes(q.toLowerCase())),
    );
  }, [industry, service, q]);

  return (
    <>
      <PageHero eyebrow="Case studies" title="Outcomes our clients can measure" description="Selected engagements across industries and services." image={images.heroCases} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "Case Studies" }]} /></div>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <Input placeholder="Search by keyword…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search case studies" />
          <select aria-label="Filter by industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">All industries</option>
            {industries.map((i) => <option key={i.slug} value={i.slug}>{i.name}</option>)}
          </select>
          <select aria-label="Filter by service" value={service} onChange={(e) => setService(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">All services</option>
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          </select>
          <button type="button" onClick={() => { setIndustry(""); setService(""); setQ(""); }} className="h-9 rounded-md border border-input text-sm hover:bg-muted">Reset</button>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">No case studies match your filters.</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <Link key={c.slug} to="/case-studies/$slug" params={{ slug: c.slug }} className="group block overflow-hidden rounded-xl border border-border bg-card hover:border-[var(--gold)]">
                <div className="aspect-[16/10] bg-muted overflow-hidden">
                  <img src={c.image} alt="" loading="lazy" width={1400} height={875} className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.industry} · {c.service}</p>
                  <h2 className="mt-2 font-serif text-lg text-[var(--navy-deep)]">{c.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <CTASection />
    </>
  );
}
