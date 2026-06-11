import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { images } from "@/data/images";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Summit Advisory Group" },
      { name: "description", content: "How and why Summit Advisory Group uses cookies." },
      { property: "og:url", content: "/cookie-policy" },
    ],
    links: [{ rel: "canonical", href: "/cookie-policy" }],
  }),
  component: CookiePage,
});

function CookiePage() {
  const paras = [
    "Cookies are small text files placed on your device to help websites work and to provide reporting information.",
    "We use strictly necessary cookies for site functionality and, with your consent, analytics cookies to understand site usage.",
    "You can change your cookie preferences at any time using the cookie banner. Disabling some cookies may impact your experience.",
  ];
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookie Policy" image={images.heroAbout} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "Cookie Policy" }]} /></div>
      <article className="mx-auto max-w-3xl px-6 py-16 space-y-4 text-foreground/90">
        {paras.map((p, i) => <p key={i}>{p}</p>)}
      </article>
    </>
  );
}
