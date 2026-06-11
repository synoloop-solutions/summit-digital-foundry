import { clientLogos, certifications, awards, memberships } from "@/data/trust";
import { Award, ShieldCheck, Users } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export function TrustBlock() {
  return (
    <section className="bg-[var(--surface)] border-y border-border">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Trusted by leaders"
          title="The credibility behind every engagement"
          description="From global Fortune 500s to scaling mid-market companies, our work is recognized and certified by leading institutions."
          align="center"
        />

        <div className="mt-12">
          <p className="text-center text-xs uppercase tracking-wider text-muted-foreground">Selected clients</p>
          <ul className="mt-6 grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-4 lg:grid-cols-8" aria-label="Client logos">
            {clientLogos.map((l) => (
              <li key={l.name} className="flex items-center justify-center">
                <span className="font-serif text-lg font-semibold text-[var(--navy-deep)]/70 hover:text-[var(--navy-deep)] transition-colors">
                  {l.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="flex items-center gap-2 font-serif text-lg text-[var(--navy-deep)]"><ShieldCheck className="h-5 w-5 text-[var(--gold)]" /> Certifications</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {certifications.map((c) => (
                <li key={c.name} className="rounded-md border border-border bg-background p-3">
                  <span className="font-medium text-foreground">{c.name}</span>
                  <span className="block text-xs text-muted-foreground">{c.issuer} · {c.year}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-serif text-lg text-[var(--navy-deep)]"><Award className="h-5 w-5 text-[var(--gold)]" /> Awards</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {awards.map((a) => (
                <li key={a.name} className="rounded-md border border-border bg-background p-3">
                  <span className="font-medium text-foreground">{a.name}</span>
                  <span className="block text-xs text-muted-foreground">{a.issuer} · {a.year}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-serif text-lg text-[var(--navy-deep)]"><Users className="h-5 w-5 text-[var(--gold)]" /> Memberships</h3>
            <ul className="mt-4 grid gap-2 text-sm">
              {memberships.map((m) => (
                <li key={m.name} className="rounded-md border border-border bg-background p-3 font-medium text-foreground">{m.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
