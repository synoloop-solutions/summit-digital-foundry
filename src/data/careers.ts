export interface Job {
  slug: string;
  title: string;
  location: string;
  team: string;
  type: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  compensation?: string;
  benefits?: string[];
  aboutTeam?: string;
}

const sharedBenefits = [
  "Competitive base salary plus performance bonus",
  "Comprehensive medical, dental, and vision coverage",
  "Generous PTO plus firm-wide rest weeks",
  "Annual learning & development stipend",
  "Hybrid work model with travel as needed",
  "Parental leave and family support programs",
];

export const jobs: Job[] = [
  {
    slug: "senior-consultant-strategy",
    title: "Senior Consultant, Strategy",
    location: "New York, NY",
    team: "Strategy",
    type: "Full-time",
    summary: "Lead workstreams on growth strategy, market entry, and operating model engagements.",
    responsibilities: [
      "Own workstream delivery end-to-end",
      "Coach 1–2 junior consultants",
      "Lead client workshops with senior executives",
      "Build hypothesis-driven analyses and synthesize findings",
      "Contribute to firm IP and practice development",
    ],
    qualifications: [
      "4+ years consulting experience at a top-tier firm",
      "Strong analytical and storytelling skills",
      "Undergraduate degree; MBA a plus",
      "Comfortable working directly with C-suite stakeholders",
    ],
    compensation: "$165,000 – $195,000 base + performance bonus",
    benefits: sharedBenefits,
    aboutTeam:
      "Our Strategy team partners with CEOs, boards, and executive teams on the decisions that shape the next five years of their business — corporate strategy, market entry, portfolio choices, and growth.",
  },
  {
    slug: "manager-digital",
    title: "Manager, Digital & AI",
    location: "London, UK",
    team: "Digital & AI",
    type: "Full-time",
    summary: "Lead digital transformation and AI/ML programs across financial services and industrials.",
    responsibilities: [
      "Lead 6–10 person delivery teams",
      "Own client relationships at the director/VP level",
      "Drive practice development and reusable assets",
      "Translate ambiguous problems into measurable roadmaps",
    ],
    qualifications: [
      "6+ years experience in digital/AI delivery",
      "Track record delivering enterprise programs",
      "Working knowledge of cloud, data platforms, and MLOps",
    ],
    compensation: "£110,000 – £140,000 base + performance bonus",
    benefits: sharedBenefits,
    aboutTeam:
      "Digital & AI is our fastest-growing practice. We help leaders move beyond pilots into production — cloud modernization, data platforms, and applied AI that actually compounds.",
  },
  {
    slug: "associate-operations",
    title: "Associate, Operations",
    location: "Toronto, ON",
    team: "Operations",
    type: "Full-time",
    summary: "Support diagnostics and implementation work on operations excellence engagements.",
    responsibilities: [
      "Build models and quantitative analyses",
      "Synthesize findings into client-ready outputs",
      "Support workshop facilitation and stakeholder interviews",
      "Collect and analyze operational data on-site",
    ],
    qualifications: [
      "1–3 years experience in consulting, industry, or analytics",
      "Strong Excel and structured thinking",
      "Curiosity about how things actually work on the ground",
    ],
    compensation: "CAD $95,000 – $115,000 base + performance bonus",
    benefits: sharedBenefits,
    aboutTeam:
      "Operations is where strategy meets the shop floor. Our team gets close to the work — process, supply chain, service operations — and helps clients unlock measurable performance.",
  },
  {
    slug: "principal-financial-advisory",
    title: "Principal, Financial Advisory",
    location: "Singapore",
    team: "Financial Advisory",
    type: "Full-time",
    summary: "Lead CFO advisory and M&A engagements across APAC.",
    responsibilities: [
      "Develop and own senior client relationships",
      "Lead multi-disciplinary delivery teams",
      "Drive regional thought leadership and BD",
      "Mentor managers and senior consultants",
    ],
    qualifications: [
      "10+ years experience in finance/consulting",
      "CPA or CFA preferred",
      "Demonstrated business development track record",
    ],
    compensation: "SGD $260,000 – $310,000 base + performance bonus",
    benefits: sharedBenefits,
    aboutTeam:
      "Financial Advisory partners with CFOs and finance leaders on the highest-stakes decisions — finance transformation, M&A diligence, capital strategy, and value creation.",
  },
];

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
