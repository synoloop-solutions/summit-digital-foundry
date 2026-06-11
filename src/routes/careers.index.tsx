import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { jobs } from "@/data/careers";
import { images } from "@/data/images";

export const Route = createFileRoute("/careers/")({
  head: () => ({
    meta: [
      { title: "Careers — Summit Advisory Group" },
      { name: "description", content: "Build a consulting career with Summit Advisory Group." },
      { property: "og:title", content: "Careers — Summit Advisory Group" },
      { property: "og:description", content: "Open roles at Summit Advisory Group." },
      { property: "og:url", content: "/careers" },
      { property: "og:image", content: images.heroCareers },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersIndex,
});

function CareersIndex() {
  return (
    <>
      <PageHero eyebrow="Careers" title="Build a consulting career that lasts" description="We hire experienced practitioners who care about craft, clients, and colleagues." image={images.heroCareers} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "Careers" }]} /></div>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-serif text-2xl text-[var(--navy-deep)]">Open roles</h2>
        <ul className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
          {jobs.map((j) => (
            <li key={j.slug} className="p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg text-[var(--navy-deep)]">{j.title}</h3>
                <p className="text-sm text-muted-foreground">{j.team} · {j.location} · {j.type}</p>
              </div>
              <Link to="/careers/$slug" params={{ slug: j.slug }} className="text-sm font-medium text-[var(--navy-deep)] hover:text-[var(--gold)]">
                View role →
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CTASection title="Don't see your role?" description="We're always interested in talking to exceptional practitioners. Send us a note." />
    </>
  );
}