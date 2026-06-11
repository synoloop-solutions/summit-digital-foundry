import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getInsight } from "@/data/insights";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const insight = getInsight(params.slug);
    if (!insight) throw notFound();
    return { insight };
  },
  head: ({ params, loaderData }) => {
    const i = loaderData?.insight;
    return {
      meta: [
        { title: `${i?.title ?? "Insight"} — Summit Advisory Group` },
        { name: "description", content: i?.excerpt ?? "" },
        { property: "og:title", content: i?.title ?? "Insight" },
        { property: "og:description", content: i?.excerpt ?? "" },
        { property: "og:url", content: `/insights/${params.slug}` },
        { property: "og:type", content: "article" },
        { property: "og:image", content: i?.image },
      ],
      links: [{ rel: "canonical", href: `/insights/${params.slug}` }],
      scripts: i ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: i.title,
          image: i.image,
          datePublished: i.date,
          author: { "@type": "Person", name: i.author },
        }),
      }] : [],
    };
  },
  component: InsightDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl text-[var(--navy-deep)]">Article not found</h1>
      <Link to="/insights" className="mt-6 inline-block underline">All insights</Link>
    </div>
  ),
});

function InsightDetail() {
  const { insight: i } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow={i.category} title={i.title} description={i.excerpt} image={i.image} />
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumbs items={[{ label: "Insights", to: "/insights" }, { label: i.title }]} />
      </div>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-muted-foreground">By {i.author} · {new Date(i.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })} · {i.readingMinutes} min read</p>
        <div className="mt-8 space-y-5 text-foreground/90 leading-relaxed">
          {i.body.map((p, idx) => <p key={idx}>{p}</p>)}
        </div>
      </article>
      <CTASection />
    </>
  );
}
