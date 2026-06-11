export interface Job {
  slug: string;
  title: string;
  location: string;
  team: string;
  type: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
}

export const jobs: Job[] = [
  {
    slug: "senior-consultant-strategy",
    title: "Senior Consultant, Strategy",
    location: "New York, NY",
    team: "Strategy",
    type: "Full-time",
    summary: "Lead workstreams on growth strategy, market entry, and operating model engagements.",
    responsibilities: ["Own workstream delivery", "Coach 1–2 junior consultants", "Lead client workshops"],
    qualifications: ["4+ years consulting experience", "Strong analytical and storytelling skills", "Undergraduate degree; MBA a plus"],
  },
  {
    slug: "manager-digital",
    title: "Manager, Digital & AI",
    location: "London, UK",
    team: "Digital & AI",
    type: "Full-time",
    summary: "Lead digital transformation and AI/ML programs across financial services and industrials.",
    responsibilities: ["Lead 6–10 person teams", "Own client relationships", "Drive practice development"],
    qualifications: ["6+ years experience in digital/AI", "Track record delivering enterprise programs"],
  },
  {
    slug: "associate-operations",
    title: "Associate, Operations",
    location: "Toronto, ON",
    team: "Operations",
    type: "Full-time",
    summary: "Support diagnostics and implementation work on operations excellence engagements.",
    responsibilities: ["Build models and analyses", "Synthesize findings", "Support workshop facilitation"],
    qualifications: ["1–3 years experience", "Strong Excel and structured thinking"],
  },
  {
    slug: "principal-financial-advisory",
    title: "Principal, Financial Advisory",
    location: "Singapore",
    team: "Financial Advisory",
    type: "Full-time",
    summary: "Lead CFO advisory and M&A engagements across APAC.",
    responsibilities: ["Develop client relationships", "Lead delivery teams", "Drive thought leadership"],
    qualifications: ["10+ years experience in finance/consulting", "CPA or CFA preferred"],
  },
];

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
