export interface Faq { q: string; a: string; }
export interface FaqGroup { id: string; title: string; items: Faq[]; }

export const faqGroups: FaqGroup[] = [
  {
    id: "engagement",
    title: "Engagement process",
    items: [
      { q: "How do engagements typically start?", a: "Most engagements begin with a no-cost discovery call followed by a short scoping workshop. We then issue a written proposal with scope, deliverables, timeline, and fees." },
      { q: "Do you sign NDAs?", a: "Yes. We routinely sign mutual NDAs before any sensitive discovery work begins." },
      { q: "Who will be on my team?", a: "Every engagement is led by a partner with hands-on involvement from senior practitioners. We staff lean, experienced teams — not pyramids." },
    ],
  },
  {
    id: "consultation",
    title: "Consultation process",
    items: [
      { q: "What happens on a consultation call?", a: "We listen first. Expect 30–45 minutes spent understanding your context, followed by initial hypotheses and recommended next steps." },
      { q: "Is the first call really free?", a: "Yes. Our first conversation is always complimentary and carries no obligation." },
      { q: "How quickly can we get on the calendar?", a: "Most prospective clients are scheduled within five business days." },
    ],
  },
  {
    id: "industries",
    title: "Industries served",
    items: [
      { q: "Which industries do you serve?", a: "Financial services, healthcare and life sciences, manufacturing and industrial, consumer and retail, energy and utilities, and logistics and transportation." },
      { q: "Do you work with mid-market companies?", a: "Yes. Roughly a third of our work is with companies between $250M and $2B in revenue." },
      { q: "Do you work with private equity portfolio companies?", a: "Frequently. We support diligence, value-creation planning, and post-close execution." },
    ],
  },
  {
    id: "timelines",
    title: "Project timelines",
    items: [
      { q: "How long does a typical engagement run?", a: "Diagnostics run 4–6 weeks. Strategy engagements run 8–12 weeks. Transformation programs typically run 6–24 months." },
      { q: "Can you mobilize quickly?", a: "Yes. We can typically mobilize a senior team within 2–3 weeks of signing." },
    ],
  },
  {
    id: "pricing",
    title: "Pricing approach",
    items: [
      { q: "How do you price engagements?", a: "We price by scope and value. Most engagements are fixed-fee with clearly defined deliverables and milestones." },
      { q: "Do you offer outcome-based pricing?", a: "Yes, for select transformation engagements we structure a portion of fees against agreed outcome metrics." },
      { q: "Are travel costs included?", a: "Travel and out-of-pocket costs are billed at cost and capped at a percentage of fees, agreed in writing up front." },
    ],
  },
];
