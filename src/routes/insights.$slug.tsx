import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { getInsight, insights } from "@/data/insights";
import { team } from "@/data/team";

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
  const authorMember = team.find((t) => t.name === i.author);
  const related = insights.filter((x) => x.slug !== i.slug && x.category === i.category).slice(0, 3);
  const fallbackRelated = related.length > 0 ? related : insights.filter((x) => x.slug !== i.slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={i.category} title={i.title} description={i.excerpt} image={i.image} />
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumbs items={[{ label: "Insights", to: "/insights" }, { label: i.title }]} />
      </div>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex items-center gap-3 border-b border-border pb-6">
          {authorMember && (
            <img src={authorMember.photo} alt={authorMember.name} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
          )}
          <div>
            <p className="text-sm font-medium text-[var(--navy-deep)]">{i.author}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(i.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })} · {i.readingMinutes} min read
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-5 text-foreground/90 leading-relaxed">
          {i.body.map((p: string, idx: number) => <p key={idx}>{p}</p>)}
        </div>

        {authorMember && (
          <div className="mt-12 rounded-2xl border border-border bg-[var(--surface)] p-6 flex items-center gap-4">
            <img src={authorMember.photo} alt={authorMember.name} width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">About the author</p>
              <p className="mt-1 font-serif text-lg text-[var(--navy-deep)]">{authorMember.name}</p>
              <p className="text-sm text-muted-foreground">{authorMember.role}</p>
            </div>
            <Link to="/team/$slug" params={{ slug: authorMember.slug }} className="text-sm font-medium text-[var(--navy-deep)] hover:text-[var(--gold)]">
              View profile →
            </Link>
          </div>
        )}
      </article>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="font-serif text-2xl text-[var(--navy-deep)]">Related reading</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {fallbackRelated.map((r) => (
            <Link key={r.slug} to="/insights/$slug" params={{ slug: r.slug }} className="group block overflow-hidden rounded-xl border border-border bg-card hover:border-[var(--gold)]">
              <div className="aspect-[16/10] bg-muted">
                <img src={r.image} alt="" loading="lazy" width={1200} height={750} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{r.category}</p>
                <h3 className="mt-2 font-serif text-base text-[var(--navy-deep)]">{r.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[var(--surface)] border-y border-border">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="font-serif text-2xl text-[var(--navy-deep)]">Get our latest insights</h2>
          <p className="mt-2 text-sm text-muted-foreground">One thoughtful brief per month. No filler.</p>
          <div className="mt-6"><NewsletterForm /></div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
