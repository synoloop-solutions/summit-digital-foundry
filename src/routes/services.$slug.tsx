import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { getService, services } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";
import { images } from "@/data/images";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ params, loaderData }) => {
    const s = loaderData?.service;
    return {
      meta: [
        { title: `${s?.name ?? "Service"} — Summit Advisory Group` },
        { name: "description", content: s?.short ?? "" },
        { property: "og:title", content: `${s?.name ?? "Service"} — Summit Advisory Group` },
        { property: "og:description", content: s?.short ?? "" },
        { property: "og:url", content: `/services/${params.slug}` },
        { property: "og:image", content: images.heroServices },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
      scripts: s ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          description: s.description,
          provider: { "@type": "Organization", name: "Summit Advisory Group" },
        }),
      }] : [],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => <NotFoundService />,
});

function NotFoundService() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl text-[var(--navy-deep)]">Service not found</h1>
      <Link to="/services" className="mt-6 inline-block text-[var(--navy-deep)] underline">Back to all services</Link>
    </div>
  );
}

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const related = caseStudies.filter((c) => c.serviceSlug === service.slug).slice(0, 3);
  const Icon = service.icon;
  return (
    <>
      <PageHero eyebrow="Service" title={service.name} description={service.description} image={images.heroServices} />
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumbs items={[{ label: "Services", to: "/services" }, { label: service.name }]} />
      </div>
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <Icon className="h-10 w-10 text-[var(--navy-deep)]" />
          <h2 className="mt-6 font-serif text-2xl text-[var(--navy-deep)]">What we do</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {service.capabilities.map((c: string) => (
              <li key={c} className="flex items-start gap-2 rounded-lg border border-border bg-card p-4 text-sm">
                <Check className="h-4 w-4 shrink-0 text-[var(--gold)]" /> {c}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-serif text-2xl text-[var(--navy-deep)]">Outcomes you can expect</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {service.outcomes.map((o: string) => (<li key={o} className="flex gap-2"><Check className="h-4 w-4 text-[var(--gold)] mt-0.5" />{o}</li>))}
          </ul>

          {related.length > 0 && (
            <>
              <h2 className="mt-12 font-serif text-2xl text-[var(--navy-deep)]">Related case studies</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {related.map((c) => (
                  <Link key={c.slug} to="/case-studies/$slug" params={{ slug: c.slug }} className="rounded-lg border border-border bg-card p-4 hover:border-[var(--gold)]">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.industry}</p>
                    <h3 className="mt-1 font-serif text-base text-[var(--navy-deep)]">{c.title}</h3>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
        <aside className="rounded-2xl border border-border bg-[var(--surface)] p-6 h-fit lg:sticky lg:top-24">
          <h3 className="font-serif text-lg text-[var(--navy-deep)]">Talk to a partner</h3>
          <p className="mt-2 text-sm text-muted-foreground">30-minute consultation. No prep required.</p>
          <Button asChild className="mt-4 w-full bg-[var(--navy-deep)] hover:bg-[var(--navy)] text-white">
            <Link to="/book-consultation">Book consultation</Link>
          </Button>
          <h4 className="mt-8 text-xs uppercase tracking-wider text-muted-foreground">Other services</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {services.filter((s) => s.slug !== service.slug).slice(0, 4).map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="inline-flex items-center gap-1 text-[var(--navy-deep)] hover:text-[var(--gold)]">
                  {s.name} <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>
      <CTASection />
    </>
  );
}
