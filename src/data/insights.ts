import { images } from "./images";

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readingMinutes: number;
  image: string;
  body: string[];
}

export const insights: Insight[] = [
  {
    slug: "from-pilot-to-platform-ai-in-financial-services",
    title: "From pilot to platform: scaling AI in financial services",
    excerpt: "Why 80% of AI pilots stall — and the operating model patterns that get banks past the pilot graveyard.",
    category: "Digital & AI",
    author: "Sophia Laurent",
    date: "2026-05-12",
    readingMinutes: 8,
    image: images.insight1,
    body: [
      "Most banks have run dozens of AI pilots. Very few have moved them into production at scale. The bottleneck is rarely the model — it is the operating model.",
      "Across our work with global banks we see a consistent pattern: pilots win on technical merit but lose on governance, MLOps maturity, and change management.",
      "The institutions that succeed in scaling AI invest in three foundations: shared data products, a hardened MLOps platform, and an empowered domain operating model that ties AI ownership to P&L.",
    ],
  },
  {
    slug: "the-quiet-economics-of-process-redesign",
    title: "The quiet economics of process redesign",
    excerpt: "Why incremental process work compounds faster than headline transformation programs.",
    category: "Operations",
    author: "Daniel Okafor",
    date: "2026-04-22",
    readingMinutes: 6,
    image: images.insight2,
    body: [
      "Boards love transformation programs with bold names and bold numbers. But the most enduring margin improvements we see come from quieter, compounding work: process redesign tied to durable management routines.",
      "Each percentage point of cycle time recovered is reinvested into the next improvement. Over three years, that compounding routinely outperforms big-bang programs.",
    ],
  },
  {
    slug: "the-cfo-agenda-for-2026",
    title: "The CFO agenda for 2026",
    excerpt: "Five priorities reshaping the finance function — and the capabilities required to deliver them.",
    category: "Financial Advisory",
    author: "Marcus Tan",
    date: "2026-04-03",
    readingMinutes: 7,
    image: images.insight3,
    body: [
      "Finance leaders enter 2026 facing a different mandate than the one they were hired for. Capital is expensive, regulators are louder, and AI is reshaping the cost-to-serve calculus.",
      "Our CFO research highlights five priorities: real-time planning, predictive close, AI-augmented FP&A, capital optimization, and finance talent reinvention.",
    ],
  },
  {
    slug: "building-a-resilient-supply-chain",
    title: "Building a resilient supply chain (without breaking the bank)",
    excerpt: "Practical resilience moves that protect service without permanently inflating inventory.",
    category: "Operations",
    author: "Daniel Okafor",
    date: "2026-03-18",
    readingMinutes: 9,
    image: images.insight4,
    body: [
      "Resilience does not mean stockpiling. The leaders we work with treat resilience as a design choice: where to dual-source, where to redesign for substitution, and where to invest in visibility.",
      "A small number of structural decisions outperform large inventory increases on both service and capital efficiency.",
    ],
  },
  {
    slug: "the-board-conversation-about-ai-governance",
    title: "The board conversation about AI governance",
    excerpt: "Directors are asking sharper questions about AI risk. Here is how management teams should prepare.",
    category: "Risk & Compliance",
    author: "Rohan Patel",
    date: "2026-03-02",
    readingMinutes: 6,
    image: images.insight5,
    body: [
      "AI governance has moved from a technical topic to a board-level concern. Directors want clarity on model inventories, risk tiering, and accountability.",
      "Management teams should arrive prepared with a single AI risk register, a clear policy framework, and evidence of human oversight at the right points in each model lifecycle.",
    ],
  },
  {
    slug: "change-that-sticks",
    title: "Change that sticks: the leadership behaviors that drive adoption",
    excerpt: "The handful of leadership behaviors that separate sustained adoption from short-lived enthusiasm.",
    category: "People & Change",
    author: "Isabela Cruz",
    date: "2026-02-14",
    readingMinutes: 5,
    image: images.insight6,
    body: [
      "Change programs that deliver lasting adoption look different from those that produce only short-lived enthusiasm.",
      "The differentiator is leadership behavior: visible role modeling, consistent storytelling, and unambiguous reinforcement through performance management.",
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
