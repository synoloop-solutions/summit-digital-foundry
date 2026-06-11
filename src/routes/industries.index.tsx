import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { industries } from "@/data/industries";
import { images } from "@/data/images";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries — Summit Advisory Group" },
      { name: "description", content: "Industry-specific consulting across financial services, healthcare, manufacturing, retail, energy, and logistics." },
      { property: "og:title", content: "Industries — Summit Advisory Group" },
      { property: "og:description", content: "Industry-specific consulting and execution." },
      { property: "og:url", content: "/industries" },
      { property: "og:image", content: images.heroIndustries },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <>
      <PageHero eyebrow="Industries" title="Industry expertise that compounds" description="Senior practitioners with decades inside the industries they advise." image={images.heroIndustries} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "Industries" }]} /></div>
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((i) => {
          const Icon = i.icon;
          return (
            <Link key={i.slug} to="/industries/$slug" params={{ slug: i.slug }} className="group rounded-xl border border-border bg-card p-6 hover:border-[var(--gold)] hover:shadow-md transition-all">
              <Icon className="h-8 w-8 text-[var(--navy-deep)]" />
              <h2 className="mt-5 font-serif text-xl text-[var(--navy-deep)]">{i.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{i.short}</p>
            </Link>
          );
        })}
      </section>
      <CTASection />
    </>
  );
}