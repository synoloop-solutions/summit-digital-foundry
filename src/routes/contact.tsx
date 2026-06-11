import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { company } from "@/data/company";
import { images } from "@/data/images";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Summit Advisory Group" },
      { name: "description", content: "Get in touch with Summit Advisory Group." },
      { property: "og:title", content: "Contact — Summit Advisory Group" },
      { property: "og:description", content: "Get in touch with Summit Advisory Group." },
      { property: "og:url", content: "/contact" },
      { property: "og:image", content: images.heroContact },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's start a conversation" description="We respond to every inquiry within one business day." image={images.heroContact} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "Contact" }]} /></div>
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="font-serif text-2xl text-[var(--navy-deep)]">Send us a message</h2>
          <p className="mt-2 text-muted-foreground">Share a few details and a partner will be in touch.</p>
          <div className="mt-6"><ContactForm /></div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-[var(--surface)] p-6">
            <h3 className="font-serif text-lg text-[var(--navy-deep)]">Headquarters</h3>
            <ul className="mt-4 space-y-3 text-sm text-foreground">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-[var(--gold)] mt-0.5" /> {company.address}</li>
              <li className="flex items-start gap-2"><Phone className="h-4 w-4 text-[var(--gold)] mt-0.5" /> {company.phone}</li>
              <li className="flex items-start gap-2"><Mail className="h-4 w-4 text-[var(--gold)] mt-0.5" /> {company.email}</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="aspect-[4/3] bg-muted">
              <img src={images.mapImage} alt="Map showing the New York City area" loading="lazy" width={1600} height={1200} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="rounded-2xl border border-border p-6">
            <h3 className="font-serif text-lg text-[var(--navy-deep)]">Offices</h3>
            <ul className="mt-3 grid gap-1 text-sm text-muted-foreground">{company.offices.map((o) => <li key={o}>{o}</li>)}</ul>
          </div>
        </aside>
      </section>
    </>
  );
}
