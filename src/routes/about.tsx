import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";
import { CTASection } from "@/components/CTASection";
import { images } from "@/data/images";
import { company } from "@/data/company";
import { team } from "@/data/team";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${company.name}` },
      { name: "description", content: `Meet the people, principles, and history behind ${company.name}.` },
      { property: "og:title", content: `About — ${company.name}` },
      { property: "og:description", content: `Meet the people, principles, and history behind ${company.name}.` },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: images.heroAbout },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Built to last. Built to deliver." description="Since 2008, Summit has helped leadership teams turn ambition into measurable results." image={images.heroAbout} />

      <section className="mx-auto max-w-7xl px-6 py-24 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeader eyebrow="Our story" title="Founded by practitioners. Run by partners." description="Summit was founded in 2008 by a small group of operators frustrated by the gap between consulting decks and operational reality. Today we are a global firm — still led hands-on by partners who do the work alongside our clients." />
          <p className="mt-6 text-muted-foreground">We've grown to {company.offices.length} offices across {company.offices.join(", ")} and serve clients in 30+ countries. We've stayed small enough to staff lean teams, and senior enough that experience is the rule, not the exception.</p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-border">
          <div className="aspect-[4/3] bg-muted">
            <img src={images.heroAbout} alt="Summit Advisory team in workshop" loading="lazy" width={1800} height={1350} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeader eyebrow="Our principles" title="What we believe" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { t: "Be useful, not impressive", d: "We measure ourselves by what changes after we leave — not by the polish of the deck." },
              { t: "Lean teams over pyramids", d: "Senior practitioners do the work. Junior team members learn by doing, not by formatting slides." },
              { t: "Sustained over spectacular", d: "We bias toward changes that compound. Predictable improvement beats short-lived heroics." },
              { t: "Truth before comfort", d: "We deliver direct, evidence-based recommendations — even when they aren't easy to hear." },
              { t: "Knowledge transfer is the deliverable", d: "Our work succeeds when client teams can sustain and scale it without us." },
              { t: "Trust through transparency", d: "Clear scope, clear pricing, clear progress. No surprises." },
            ].map((p) => (
              <div key={p.t} className="rounded-xl border border-border bg-background p-6">
                <h3 className="font-serif text-lg text-[var(--navy-deep)]">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow="Leadership" title="A partner-led firm" />
          <Link to="/team" className="text-sm font-medium text-[var(--navy-deep)] hover:text-[var(--gold)]">Meet the full team →</Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.slice(0, 4).map((m) => (
            <Link key={m.slug} to="/team/$slug" params={{ slug: m.slug }} className="group block">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" width={600} height={750} className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]" />
              </div>
              <h3 className="mt-3 font-serif text-lg text-[var(--navy-deep)]">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}

export function PageHero({ eyebrow, title, description, image }: { eyebrow: string; title: string; description?: string; image: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--navy-deep)] text-white">
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-deep)]/85 to-[var(--navy-deep)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">{eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl max-w-4xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg text-white/85">{description}</p>}
      </div>
    </section>
  );
}
