import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { insights } from "@/data/insights";
import { images } from "@/data/images";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights — Summit Advisory Group" },
      { name: "description", content: "Research, perspectives, and frameworks from Summit Advisory Group." },
      { property: "og:title", content: "Insights — Summit Advisory Group" },
      { property: "og:description", content: "Research, perspectives, and frameworks." },
      { property: "og:url", content: "/insights" },
      { property: "og:image", content: images.heroInsights },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: InsightsIndex,
});

function InsightsIndex() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Ideas worth your inbox" description="Practical perspectives from the partners doing the work." image={images.heroInsights} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "Insights" }]} /></div>
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {insights.map((i) => (
          <Link key={i.slug} to="/insights/$slug" params={{ slug: i.slug }} className="group block overflow-hidden rounded-xl border border-border bg-card hover:border-[var(--gold)]">
            <div className="aspect-[16/10] bg-muted overflow-hidden">
              <img src={i.image} alt="" loading="lazy" width={1200} height={750} className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]" />
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{i.category} · {i.readingMinutes} min read</p>
              <h2 className="mt-2 font-serif text-lg text-[var(--navy-deep)]">{i.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{i.excerpt}</p>
            </div>
          </Link>
        ))}
      </section>
      <CTASection />
    </>
  );
}