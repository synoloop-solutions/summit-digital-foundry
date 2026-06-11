import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { services } from "@/data/services";
import { images } from "@/data/images";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Summit Advisory Group" },
      { name: "description", content: "Six practice areas — strategy, operations, digital, financial advisory, risk, and people & change." },
      { property: "og:title", content: "Services — Summit Advisory Group" },
      { property: "og:description", content: "Six practice areas built to deliver measurable outcomes." },
      { property: "og:url", content: "/services" },
      { property: "og:image", content: images.heroServices },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <>
      <PageHero eyebrow="Services" title="Six practice areas. One operating system." description="Each service stands on its own — and works better together." image={images.heroServices} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "Services" }]} /></div>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group rounded-xl border border-border bg-card p-6 hover:border-[var(--gold)] hover:shadow-md transition-all">
                <Icon className="h-8 w-8 text-[var(--navy-deep)]" />
                <h2 className="mt-5 font-serif text-xl text-[var(--navy-deep)]">{s.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--navy-deep)] group-hover:text-[var(--gold)]">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <CTASection />
    </>
  );
}