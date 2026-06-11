import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getTeamMember } from "@/data/team";
import { images } from "@/data/images";

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
  return (
    <>
      <PageHero eyebrow="Team" title={member.name} description={member.role} image={images.heroTeam} />
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumbs items={[{ label: "Team", to: "/team" }, { label: member.name }]} />
      </div>
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
          <img src={member.photo} alt={`Portrait of ${member.name}`} width={600} height={750} className="h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="font-serif text-2xl text-[var(--navy-deep)]">Biography</h2>
          <p className="mt-3 text-muted-foreground">{member.bio}</p>
          <h3 className="mt-8 font-serif text-lg text-[var(--navy-deep)]">Focus areas</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {member.focus.map((f: string) => <li key={f} className="rounded-full border border-border px-3 py-1 text-xs">{f}</li>)}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}
