import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { KpiGrid } from "@/components/KpiGrid";
import { CaseStudyDownloadButton } from "@/components/CaseStudyDownloadButton";
import { getCaseStudy, caseStudies } from "@/data/caseStudies";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const cs = getCaseStudy(params.slug);
    if (!cs) throw notFound();
    return { cs };
  },
  head: ({ params, loaderData }) => {
    const cs = loaderData?.cs;
    return {
      meta: [
        { title: `${cs?.title ?? "Case study"} — Summit Advisory Group` },
        { name: "description", content: cs?.summary ?? "" },
        { property: "og:title", content: cs?.title ?? "Case study" },
        { property: "og:description", content: cs?.summary ?? "" },
        { property: "og:url", content: `/case-studies/${params.slug}` },
        { property: "og:type", content: "article" },
        { property: "og:image", content: cs?.image },
        { name: "twitter:image", content: cs?.image },
      ],
      links: [{ rel: "canonical", href: `/case-studies/${params.slug}` }],
      scripts: cs ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: cs.title,
          image: cs.image,
          datePublished: `${cs.year}-01-01`,
          author: { "@type": "Organization", name: "Summit Advisory Group" },
        }),
      }] : [],
    };
  },
  component: CaseStudyDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl text-[var(--navy-deep)]">Case study not found</h1>
      <Link to="/case-studies" className="mt-6 inline-block underline">All case studies</Link>
    </div>
  ),
});

function CaseStudyDetail() {
  const { cs } = Route.useLoaderData();
  const related = caseStudies.filter((c) => c.slug !== cs.slug && c.industrySlug === cs.industrySlug).slice(0, 3);
  return (
    <>
      <PageHero eyebrow={`${cs.industry} · ${cs.year}`} title={cs.title} description={cs.summary} image={cs.image} />
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumbs items={[{ label: "Case Studies", to: "/case-studies" }, { label: cs.title }]} />
      </div>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <KpiGrid metrics={cs.metrics} />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <article className="prose-content">
          <h2 className="font-serif text-2xl text-[var(--navy-deep)]">Client</h2>
          <p className="mt-2 text-muted-foreground">{cs.client}</p>

          <h2 className="mt-10 font-serif text-2xl text-[var(--navy-deep)]">The challenge</h2>
          <p className="mt-2 text-muted-foreground">{cs.challenge}</p>

          <h2 className="mt-10 font-serif text-2xl text-[var(--navy-deep)]">Our approach</h2>
          <ol className="mt-2 list-decimal pl-5 space-y-2 text-muted-foreground">
            {cs.approach.map((a: string) => <li key={a}>{a}</li>)}
          </ol>

          <h2 className="mt-10 font-serif text-2xl text-[var(--navy-deep)]">The outcome</h2>
          <p className="mt-2 text-muted-foreground">{cs.outcome}</p>
        </article>

        <aside className="h-fit space-y-6 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-border bg-[var(--surface)] p-6">
            <h3 className="font-serif text-lg text-[var(--navy-deep)]">Take this with you</h3>
            <p className="mt-2 text-sm text-muted-foreground">Download the full case study (PDF) for offline reading.</p>
            <div className="mt-4"><CaseStudyDownloadButton caseStudy={cs} /></div>
          </div>
          {related.length > 0 && (
            <div className="rounded-2xl border border-border p-6">
              <h3 className="font-serif text-lg text-[var(--navy-deep)]">More in {cs.industry}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link to="/case-studies/$slug" params={{ slug: r.slug }} className="text-[var(--navy-deep)] hover:text-[var(--gold)]">{r.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>

      <CTASection />
    </>
  );
}
