import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { images } from "@/data/images";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility — Summit Advisory Group" },
      { name: "description", content: "Our commitment to an accessible web experience for all users." },
      { property: "og:url", content: "/accessibility" },
    ],
    links: [{ rel: "canonical", href: "/accessibility" }],
  }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  const paras = [
    "Summit Advisory Group is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.",
    "This site is designed to conform with WCAG 2.1 AA. Features include keyboard navigation, semantic structure, sufficient color contrast, and descriptive alternative text.",
    "If you encounter accessibility barriers on this site, please contact hello@summitadvisory.example so we can address them.",
  ];
  return (
    <>
      <PageHero eyebrow="Legal" title="Accessibility Statement" image={images.heroAbout} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "Accessibility" }]} /></div>
      <article className="mx-auto max-w-3xl px-6 py-16 space-y-4 text-foreground/90">
        {paras.map((p, i) => <p key={i}>{p}</p>)}
      </article>
    </>
  );
}
