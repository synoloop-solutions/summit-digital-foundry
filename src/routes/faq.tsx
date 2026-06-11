import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqGroups } from "@/data/faqs";
import { images } from "@/data/images";

const allFaqs = faqGroups.flatMap((g) => g.items);
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Summit Advisory Group" },
      { name: "description", content: "Answers to common questions about engagements, consultations, industries, timelines, and pricing." },
      { property: "og:title", content: "FAQ — Summit Advisory Group" },
      { property: "og:description", content: "Common questions about working with Summit Advisory Group." },
      { property: "og:url", content: "/faq" },
      { property: "og:image", content: images.heroFaq },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd) }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" description="Direct answers about how we work, what we charge, and what to expect." image={images.heroFaq} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "FAQ" }]} /></div>
      <section className="mx-auto max-w-4xl px-6 py-16 space-y-12">
        {faqGroups.map((g) => (
          <div key={g.id} id={g.id}>
            <h2 className="font-serif text-2xl text-[var(--navy-deep)]">{g.title}</h2>
            <Accordion type="single" collapsible className="mt-4">
              {g.items.map((f, idx) => (
                <AccordionItem key={idx} value={`${g.id}-${idx}`}>
                  <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </section>
      <CTASection eyebrow="Still have questions?" title="We're happy to answer them." description="A 30-minute consultation is the fastest way to get clarity on what working together would look like." />
    </>
  );
}
