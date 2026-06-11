import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getTeamMember, team } from "@/data/team";
import { caseStudies } from "@/data/caseStudies";
import { insights } from "@/data/insights";
import { images } from "@/data/images";
import { Linkedin } from "lucide-react";

export const Route = createFileRoute("/team/$slug")({
  loader: ({ params }) => {
    const member = getTeamMember(params.slug);
    if (!member) throw notFound();
    return { member };
  },
  head: ({ params, loaderData }) => {
    const m = loaderData?.member;
    return {
      meta: [
        { title: `${m?.name ?? "Team member"} — Summit Advisory Group` },
        { name: "description", content: m?.bio ?? "" },
        { property: "og:title", content: m?.name ?? "Team member" },
        { property: "og:description", content: m?.bio ?? "" },
        { property: "og:url", content: `/team/${params.slug}` },
        { property: "og:image", content: m?.photo },
      ],
      links: [{ rel: "canonical", href: `/team/${params.slug}` }],
    };
  },
  component: TeamDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl text-[var(--navy-deep)]">Profile not found</h1>
      <Link to="/team" className="mt-6 inline-block underline">Back to team</Link>
    </div>
  ),
});

function TeamDetail() {
  const { member } = Route.useLoaderData();
  const memberCases = (member.caseStudies ?? [])
    .map((slug: string) => caseStudies.find((c) => c.slug === slug))
    .filter(Boolean) as typeof caseStudies;
  const relatedInsights = insights
    .filter((i) => member.focus.some((f: string) => i.category.toLowerCase().includes(f.toLowerCase().split(" ")[0])))
    .slice(0, 3);
  const otherPartners = team.filter((t) => t.slug !== member.slug).slice(0, 4);

  return (
    <>
      <PageHero eyebrow="Team" title={member.name} description={member.role} image={images.heroTeam} />
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumbs items={[{ label: "Team", to: "/team" }, { label: member.name }]} />
      </div>

      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
            <img src={member.photo} alt={`Portrait of ${member.name}`} width={600} height={750} className="h-full w-full object-cover" />
          </div>
          <a href={member.linkedin} className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--navy-deep)] hover:text-[var(--gold)]" target="_blank" rel="noreferrer">
            <Linkedin className="h-4 w-4" /> Connect on LinkedIn
          </a>
          <h3 className="mt-8 font-serif text-lg text-[var(--navy-deep)]">Focus areas</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {member.focus.map((f: string) => <li key={f} className="rounded-full border border-border px-3 py-1 text-xs">{f}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-[var(--navy-deep)]">Biography</h2>
          <p className="mt-3 text-muted-foreground">{member.bio}</p>

          {member.experience && member.experience.length > 0 && (
            <>
              <h3 className="mt-10 font-serif text-xl text-[var(--navy-deep)]">Experience</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                {member.experience.map((e: string) => <li key={e}>{e}</li>)}
              </ul>
            </>
          )}

          {member.education && member.education.length > 0 && (
            <>
              <h3 className="mt-10 font-serif text-xl text-[var(--navy-deep)]">Education</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                {member.education.map((e: string) => <li key={e}>{e}</li>)}
              </ul>
            </>
          )}

          {memberCases.length > 0 && (
            <>
              <h3 className="mt-10 font-serif text-xl text-[var(--navy-deep)]">Selected engagements</h3>
              <ul className="mt-3 space-y-2">
                {memberCases.map((c) => (
                  <li key={c.slug}>
                    <Link to="/case-studies/$slug" params={{ slug: c.slug }} className="text-sm text-[var(--navy-deep)] hover:text-[var(--gold)] underline">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {relatedInsights.length > 0 && (
            <>
              <h3 className="mt-10 font-serif text-xl text-[var(--navy-deep)]">Recent writing</h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {relatedInsights.map((i) => (
                  <li key={i.slug}>
                    <Link to="/insights/$slug" params={{ slug: i.slug }} className="block rounded-lg border border-border bg-card p-4 hover:border-[var(--gold)]">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{i.category}</p>
                      <p className="mt-1 font-serif text-sm text-[var(--navy-deep)]">{i.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section className="bg-[var(--surface)] border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="font-serif text-2xl text-[var(--navy-deep)]">Other partners</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {otherPartners.map((m) => (
              <Link key={m.slug} to="/team/$slug" params={{ slug: m.slug }} className="group block">
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                  <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" width={600} height={750} className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]" />
                </div>
                <h3 className="mt-3 font-serif text-base text-[var(--navy-deep)]">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
