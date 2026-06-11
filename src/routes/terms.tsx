import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { images } from "@/data/images";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Summit Advisory Group" },
      { name: "description", content: "Terms governing use of the Summit Advisory Group website." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const paras = [
    "By accessing this website you agree to these terms. The content is provided for general information only and does not constitute professional advice.",
    "All content on this site is the property of Summit Advisory Group or its licensors and is protected by applicable intellectual property laws.",
    "We make no warranties about the accuracy, completeness, or availability of the site. To the maximum extent permitted by law, we disclaim liability for any loss or damage arising from your use of the site.",
    "These terms are governed by the laws of the State of New York. Any disputes will be resolved in the courts of that jurisdiction.",
  ];
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" image={images.heroAbout} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "Terms" }]} /></div>
      <article className="mx-auto max-w-3xl px-6 py-16 space-y-4 text-foreground/90">
        {paras.map((p, i) => <p key={i}>{p}</p>)}
      </article>
    </>
  );
}
