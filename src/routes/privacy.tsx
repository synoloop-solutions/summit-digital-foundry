import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { images } from "@/data/images";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Summit Advisory Group" },
      { name: "description", content: "How Summit Advisory Group collects, uses, and protects your information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => <Legal title="Privacy Policy" body={privacy} />,
});

const privacy = [
  "Summit Advisory Group ('we', 'us') respects your privacy. This policy explains what information we collect, how we use it, and the choices you have.",
  "We collect information you provide through our forms (such as name, email, company, and message contents) and limited technical information (such as IP address and browser type) for security and analytics.",
  "We use your information to respond to your inquiries, deliver requested resources, improve our services, and comply with legal obligations.",
  "We do not sell personal information. We share data only with service providers acting on our behalf under appropriate confidentiality and security obligations.",
  "You may request access, correction, or deletion of your personal information by contacting hello@summitadvisory.example.",
  "We retain personal information only as long as necessary for the purposes described above or as required by law.",
];

function Legal({ title, body }: { title: string; body: string[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} image={images.heroAbout} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: title }]} /></div>
      <article className="mx-auto max-w-3xl px-6 py-16 space-y-4 text-foreground/90">
        {body.map((p, i) => <p key={i}>{p}</p>)}
      </article>
    </>
  );
}
