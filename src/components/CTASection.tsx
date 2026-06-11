import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CTASection({
  eyebrow = "Ready to get started?",
  title = "Let's talk about your next move.",
  description = "Book a 30-minute consultation with a Summit partner. No prep required — just bring the challenge on your mind.",
}: { eyebrow?: string; title?: string; description?: string }) {
  return (
    <section className="bg-[var(--navy-deep)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">{eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 text-white/80 max-w-2xl">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Button asChild size="lg" className="bg-[var(--gold)] text-[var(--navy-deep)] hover:bg-[var(--gold)]/90">
            <Link to="/book-consultation">Book Consultation</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
