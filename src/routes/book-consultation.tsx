import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingForm } from "@/components/forms/BookingForm";
import { images } from "@/data/images";

export const Route = createFileRoute("/book-consultation")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Summit Advisory Group" },
      { name: "description", content: "Book a 30-minute consultation with a Summit Advisory partner." },
      { property: "og:title", content: "Book a Consultation — Summit Advisory Group" },
      { property: "og:description", content: "Book a 30-minute consultation with a Summit Advisory partner." },
      { property: "og:url", content: "/book-consultation" },
      { property: "og:image", content: images.heroBook },
    ],
    links: [{ rel: "canonical", href: "/book-consultation" }],
  }),
  component: BookConsultation,
});

function BookConsultation() {
  return (
    <>
      <PageHero eyebrow="Consultation" title="Book a 30-minute consultation" description="Spend 30 minutes with a Summit partner. We'll listen, share initial hypotheses, and recommend next steps." image={images.heroBook} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "Book Consultation" }]} /></div>
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="font-serif text-2xl text-[var(--navy-deep)]">What to expect</h2>
          <ul className="mt-6 space-y-4 text-sm">
            {[
              "A senior practitioner — usually a partner — on the call",
              "30 focused minutes (we keep to time)",
              "Initial hypotheses and recommended next steps",
              "A short follow-up email summarizing the conversation",
              "No obligation and no sales pressure",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-[var(--gold)] mt-0.5" /> <span>{b}</span></li>
            ))}
          </ul>
          <figure className="mt-10 rounded-2xl border border-border bg-[var(--surface)] p-6">
            <blockquote className="text-sm italic text-foreground">"The first call alone reframed how we were thinking about the problem. That's rare."</blockquote>
            <figcaption className="mt-3 text-xs text-muted-foreground">— Chief Strategy Officer, Fortune 200 client</figcaption>
          </figure>
        </div>
        <div><BookingForm /></div>
      </section>
      <CTASection eyebrow="Have a more specific question?" title="Send us a message instead." description="Prefer to write before booking? Our contact form gets the same priority response." />
    </>
  );
}
