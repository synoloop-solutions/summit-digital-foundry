import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { team } from "@/data/team";
import { images } from "@/data/images";

export const Route = createFileRoute("/team/")({
  head: () => ({
    meta: [
      { title: "Team — Summit Advisory Group" },
      { name: "description", content: "Meet the partners and practitioners behind Summit Advisory Group." },
      { property: "og:title", content: "Team — Summit Advisory Group" },
      { property: "og:description", content: "Meet the partners and practitioners behind Summit Advisory Group." },
      { property: "og:url", content: "/team" },
      { property: "og:image", content: images.heroTeam },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamIndex,
});

function TeamIndex() {
  return (
    <>
      <PageHero eyebrow="Team" title="People who do the work" description="A senior bench across every practice and industry we serve." image={images.heroTeam} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "Team" }]} /></div>
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m) => (
          <Link key={m.slug} to="/team/$slug" params={{ slug: m.slug }} className="group block">
            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
              <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" width={600} height={750} className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]" />
            </div>
            <h2 className="mt-3 font-serif text-lg text-[var(--navy-deep)]">{m.name}</h2>
            <p className="text-sm text-muted-foreground">{m.role}</p>
          </Link>
        ))}
      </section>
      <CTASection />
    </>
  );
}