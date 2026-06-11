import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getIndustry, industries } from "@/data/industries";
import { caseStudies } from "@/data/caseStudies";
import { services } from "@/data/services";
import { images } from "@/data/images";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = getIndustry(params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ params, loaderData }) => {
    const i = loaderData?.industry;
    return {
      meta: [
        { title: `${i?.name ?? "Industry"} — Summit Advisory Group` },
        { name: "description", content: i?.short ?? "" },
        { property: "og:title", content: `${i?.name ?? "Industry"} — Summit Advisory Group` },
        { property: "og:description", content: i?.short ?? "" },
        { property: "og:url", content: `/industries/${params.slug}` },
        { property: "og:image", content: images.heroIndustries },
      ],
      links: [{ rel: "canonical", href: `/industries/${params.slug}` }],
    };
  },
  component: IndustryDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl text-[var(--navy-deep)]">Industry not found</h1>
      <Link to="/industries" className="mt-6 inline-block underline">Back to industries</Link>
    </div>
  ),
});

function IndustryDetail() {
  const { industry } = Route.useLoaderData();
  const related = caseStudies.filter((c) => c.industrySlug === industry.slug);
  return (
    <>
      <PageHero eyebrow="Industry" title={industry.name} description={industry.description} image={images.heroIndustries} />
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumbs items={[{ label: "Industries", to: "/industries" }, { label: industry.name }]} />
      </div>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-serif text-2xl text-[var(--navy-deep)]">Where we add value</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {industry.highlights.map((h: string) => (
            <li key={h} className="flex items-start gap-2 rounded-lg border border-border bg-card p-4 text-sm">
              <Check className="h-4 w-4 text-[var(--gold)] mt-0.5" /> {h}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-serif text-2xl text-[var(--navy-deep)]">Services we bring to {industry.name}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="rounded-lg border border-border bg-card p-4 hover:border-[var(--gold)]">
              <h3 className="font-serif text-base text-[var(--navy-deep)]">{s.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.short}</p>
            </Link>
          ))}
        </div>

        {related.length > 0 && (
          <>
            <h2 className="mt-12 font-serif text-2xl text-[var(--navy-deep)]">Selected work in {industry.name}</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <Link key={c.slug} to="/case-studies/$slug" params={{ slug: c.slug }} className="group block overflow-hidden rounded-xl border border-border bg-card hover:border-[var(--gold)]">
                  <div className="aspect-[16/10] bg-muted">
                    <img src={c.image} alt="" loading="lazy" width={1400} height={875} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.service}</p>
                    <h3 className="mt-2 font-serif text-lg text-[var(--navy-deep)]">{c.title}</h3>
                  </div>
                </Link>
              ))}
            </div>

            <h2 className="mt-12 font-serif text-2xl text-[var(--navy-deep)]">Other industries</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {industries.filter((x) => x.slug !== industry.slug).map((x) => (
                <Link key={x.slug} to="/industries/$slug" params={{ slug: x.slug }} className="rounded-full border border-border bg-card px-3 py-1 text-xs hover:border-[var(--gold)] text-[var(--navy-deep)]">
                  {x.name}
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
      <CTASection />
    </>
  );
}
