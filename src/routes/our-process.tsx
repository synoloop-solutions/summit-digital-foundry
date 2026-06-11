import { createFileRoute } from "@tanstack/react-router";
import { Search, Compass, BarChart3, Wrench, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { images } from "@/data/images";

export const Route = createFileRoute("/our-process")({
  head: () => ({
    meta: [
      { title: "Our Process — Summit Advisory Group" },
      { name: "description", content: "How we work: discovery, analysis, strategy, implementation, optimization." },
      { property: "og:title", content: "Our Process — Summit Advisory Group" },
      { property: "og:description", content: "Discovery, Analysis, Strategy, Implementation, Optimization." },
      { property: "og:url", content: "/our-process" },
      { property: "og:image", content: images.heroProcess },
    ],
    links: [{ rel: "canonical", href: "/our-process" }],
  }),
  component: OurProcess,
});

interface Stage { id: string; n: string; title: string; icon: LucideIcon; desc: string; deliverables: string[]; }

const stages: Stage[] = [
  { id: "discovery", n: "01", title: "Discovery", icon: Search, desc: "We start by listening. Stakeholder interviews, data review, and observation in the field — designed to surface what matters most.", deliverables: ["Stakeholder interview synthesis", "Baseline data assessment", "Hypotheses and key questions"] },
  { id: "analysis", n: "02", title: "Analysis", icon: BarChart3, desc: "Rigorous fact-base. Quantitative analyses, benchmarks, and root-cause work that pressure-test every hypothesis.", deliverables: ["Diagnostic findings", "Benchmark and gap analysis", "Quantified opportunity sizing"] },
  { id: "strategy", n: "03", title: "Strategy", icon: Compass, desc: "Sharp choices, validated with stakeholders. Where to play, how to win, and what to stop.", deliverables: ["Strategic roadmap", "Operating model design", "Investment case and KPIs"] },
  { id: "implementation", n: "04", title: "Implementation", icon: Wrench, desc: "Hands-on execution alongside your team. We mobilize quickly, govern transparently, and transfer ownership as we go.", deliverables: ["Program governance and PMO", "Change management plan", "Tooling and process redesign"] },
  { id: "optimization", n: "05", title: "Optimization", icon: TrendingUp, desc: "Sustained improvement. We help establish the routines, dashboards, and capabilities that keep gains compounding after we leave.", deliverables: ["Performance management routines", "KPI dashboards", "Capability development"] },
];

function OurProcess() {
  return (
    <>
      <PageHero eyebrow="Methodology" title="A proven, five-stage methodology" description="Built from hundreds of engagements. Calibrated for every client." image={images.heroProcess} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "Our Process" }]} /></div>
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Process stages" className="lg:sticky lg:top-24 h-fit">
          <ul className="space-y-1 text-sm">
            {stages.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="block rounded-md px-3 py-2 text-foreground/80 hover:bg-muted hover:text-[var(--navy-deep)]">
                  <span className="text-[var(--gold)] mr-2 font-mono text-xs">{s.n}</span>{s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ol className="space-y-12">
          {stages.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.id} id={s.id} className="scroll-mt-24 rounded-2xl border border-border bg-card p-8">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-[var(--gold)]">{s.n}</span>
                  <Icon className="h-7 w-7 text-[var(--navy-deep)]" />
                  <h2 className="font-serif text-2xl text-[var(--navy-deep)]">{s.title}</h2>
                </div>
                <p className="mt-4 text-muted-foreground">{s.desc}</p>
                <h3 className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">Typical deliverables</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                  {s.deliverables.map((d) => (
                    <li key={d} className="rounded-md border border-border bg-background p-3 text-sm">{d}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>
      <CTASection eyebrow="Curious where to start?" title="Book a discovery conversation." description="A 30-minute call is the easiest first step — and the best way to see how the process fits your situation." />
    </>
  );
}
