import { BarChart3, Briefcase, Cog, LineChart, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
  capabilities: string[];
  outcomes: string[];
}

export const services: Service[] = [
  {
    slug: "strategy-consulting",
    name: "Strategy Consulting",
    short: "Sharpen direction, capital allocation, and competitive advantage.",
    description:
      "We help leadership teams set ambitious yet achievable strategies, validated through market analysis, financial modeling, and stakeholder alignment.",
    icon: LineChart,
    capabilities: [
      "Corporate & business unit strategy",
      "Market entry and expansion",
      "Portfolio rationalization",
      "Growth strategy and pricing",
    ],
    outcomes: ["3–5 year growth roadmaps", "Board-ready strategy decks", "Aligned executive operating model"],
  },
  {
    slug: "operations-excellence",
    name: "Operations Excellence",
    short: "Reduce cost, accelerate cycle times, and scale with confidence.",
    description:
      "Process redesign, organizational design, and performance management programs that turn operational complexity into compounding margin.",
    icon: Cog,
    capabilities: [
      "Lean and process redesign",
      "Org & operating model design",
      "Supply chain optimization",
      "Shared services & GBS",
    ],
    outcomes: ["15–30% cost reduction", "Cycle time improvements", "Sustained performance management"],
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    short: "Modernize the technology stack and unlock data-driven decisions.",
    description:
      "From cloud migration to AI deployment, we deliver pragmatic transformation programs grounded in measurable business outcomes.",
    icon: BarChart3,
    capabilities: [
      "Cloud & platform strategy",
      "Data & analytics modernization",
      "AI/ML use case delivery",
      "Enterprise architecture",
    ],
    outcomes: ["Faster time-to-insight", "Reduced TCO", "Composable, future-ready platforms"],
  },
  {
    slug: "financial-advisory",
    name: "Financial Advisory",
    short: "Strengthen the finance function and unlock enterprise value.",
    description:
      "CFO advisory, FP&A modernization, and M&A diligence support to give finance leaders the visibility and tools they need.",
    icon: Briefcase,
    capabilities: [
      "CFO transformation",
      "FP&A modernization",
      "M&A diligence & integration",
      "Capital strategy",
    ],
    outcomes: ["Rolling forecasts & driver-based plans", "Deal value capture", "Investor-grade reporting"],
  },
  {
    slug: "risk-and-compliance",
    name: "Risk & Compliance",
    short: "Build resilient operating models that withstand regulatory scrutiny.",
    description:
      "Enterprise risk, regulatory remediation, and third-party risk programs designed to be auditable, automated, and durable.",
    icon: ShieldCheck,
    capabilities: [
      "Enterprise risk management",
      "Regulatory remediation",
      "Third-party risk",
      "Privacy & data protection",
    ],
    outcomes: ["Reduced audit findings", "Streamlined controls", "Board-grade risk reporting"],
  },
  {
    slug: "people-and-change",
    name: "People & Change",
    short: "Bring leaders and employees along on every transformation.",
    description:
      "Change strategy, leadership alignment, and capability building that turn strategy on paper into adoption in practice.",
    icon: Users,
    capabilities: [
      "Change management",
      "Leadership alignment",
      "Capability academies",
      "Culture & employee experience",
    ],
    outcomes: ["Faster adoption rates", "Higher engagement", "Sustained behavior change"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
