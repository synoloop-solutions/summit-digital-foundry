import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { TrustBlock } from "@/components/TrustBlock";
import { CTASection } from "@/components/CTASection";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/caseStudies";
import { testimonials } from "@/data/testimonials";
import { insights } from "@/data/insights";
import { images } from "@/data/images";
import { company } from "@/data/company";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${company.name} — ${company.tagline}` },
      { name: "description", content: company.description },
      { property: "og:title", content: `${company.name} — ${company.tagline}` },
      { property: "og:description", content: company.description },
      { property: "og:url", content: "/" },
      { property: "og:image", content: images.heroHome },
      { name: "twitter:image", content: images.heroHome },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: images.heroHome },
    ],
  }),
  component: Home,
});

function Home() {
  const featuredServices = services.slice(0, 6);
  const featuredCases = caseStudies.slice(0, 3);
  const featuredInsights = insights.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--navy-deep)] text-white">
        <img
          src={images.heroHome}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-deep)]/80 via-[var(--navy-deep)]/70 to-[var(--navy-deep)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">Consulting & professional services</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl max-w-4xl">
            Strategy that compounds. <span className="text-[var(--gold)]">Execution that lasts.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">
            Summit Advisory Group partners with ambitious companies to translate strategy into measurable outcomes — across operations, technology, and growth.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-[var(--gold)] text-[var(--navy-deep)] hover:bg-[var(--gold)]/90">
              <Link to="/book-consultation">Book a consultation <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10">
              <Link to="/case-studies">See client results</Link>
            </Button>
          </div>
          <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { v: "17+", k: "Years in business" },
              { v: "240+", k: "Engagements delivered" },
              { v: "$4.8B", k: "Client value created" },
              { v: "94%", k: "Repeat client rate" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="font-serif text-3xl font-semibold text-white">{s.v}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-white/60">{s.k}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeader eyebrow="What we do" title="Services for ambitious leadership teams" description="Six practice areas that work together to deliver outcomes that compound." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--gold)] hover:shadow-md">
                <Icon className="h-8 w-8 text-[var(--navy-deep)]" />
                <h3 className="mt-5 font-serif text-xl text-[var(--navy-deep)]">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--navy-deep)] group-hover:text-[var(--gold)]">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Industries */}
      <section className="bg-[var(--surface)] border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeader eyebrow="Who we serve" title="Deep expertise across six industries" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => {
              const Icon = i.icon;
              return (
                <Link key={i.slug} to="/industries/$slug" params={{ slug: i.slug }} className="flex items-start gap-4 rounded-lg border border-border bg-background p-5 hover:border-[var(--gold)]">
                  <Icon className="h-6 w-6 text-[var(--navy-deep)]" />
                  <div>
                    <h3 className="font-serif text-lg text-[var(--navy-deep)]">{i.name}</h3>
                    <p className="text-sm text-muted-foreground">{i.short}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow="Case studies" title="Measurable outcomes for global leaders" />
          <Link to="/case-studies" className="inline-flex items-center gap-1 text-sm font-medium text-[var(--navy-deep)] hover:text-[var(--gold)]">
            View all case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredCases.map((c) => (
            <Link key={c.slug} to="/case-studies/$slug" params={{ slug: c.slug }} className="group block overflow-hidden rounded-xl border border-border bg-card hover:border-[var(--gold)]">
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img src={c.image} alt="" loading="lazy" width={1400} height={875} className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.industry}</p>
                <h3 className="mt-2 font-serif text-lg text-[var(--navy-deep)]">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--navy-deep)] text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeader
            eyebrow="What clients say"
            title="Trusted by leaders of complex organizations"
            description="Don't take our word for it."
            className="[&_h2]:text-white [&_p]:text-white/80"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex gap-0.5 text-[var(--gold)]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 text-base text-white/90">"{t.quote}"</blockquote>
                <figcaption className="mt-4 text-sm">
                  <div className="font-medium text-white">{t.name}</div>
                  <div className="text-white/60">{t.title}, {t.company}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <TrustBlock />

      {/* Why us */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader eyebrow="Why Summit" title="The work outlives the engagement" description="Our partners are hands-on practitioners. Lean teams, sharper diagnostics, and accountability for outcomes — not slide counts." />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              "Partner-led teams on every engagement",
              "Outcomes measured in your numbers — not ours",
              "Lean staffing, not pyramids",
              "Industry-specific senior practitioners",
              "Knowledge transfer baked into delivery",
              "Sustainable change, not slide-ware",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                <span className="text-sm text-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Insights */}
      <section className="bg-[var(--surface)] border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow="Insights" title="Ideas worth your inbox" />
            <Link to="/insights" className="inline-flex items-center gap-1 text-sm font-medium text-[var(--navy-deep)] hover:text-[var(--gold)]">
              All insights <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredInsights.map((i) => (
              <Link key={i.slug} to="/insights/$slug" params={{ slug: i.slug }} className="group block overflow-hidden rounded-xl border border-border bg-background hover:border-[var(--gold)]">
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img src={i.image} alt="" loading="lazy" width={1200} height={750} className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{i.category}</p>
                  <h3 className="mt-2 font-serif text-lg text-[var(--navy-deep)] line-clamp-2">{i.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{i.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
