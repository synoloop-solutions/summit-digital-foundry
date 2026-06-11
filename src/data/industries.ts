import { Banknote, Factory, HeartPulse, ShoppingBag, Truck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Industry {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
}

export const industries: Industry[] = [
  {
    slug: "financial-services",
    name: "Financial Services",
    short: "Banks, insurers, and asset managers navigating regulation and digital disruption.",
    description:
      "We support financial institutions across digital banking, risk modernization, regulatory remediation, and front-to-back transformation.",
    icon: Banknote,
    highlights: ["Core banking modernization", "Risk & compliance", "Wealth & asset management"],
  },
  {
    slug: "healthcare-life-sciences",
    name: "Healthcare & Life Sciences",
    short: "Providers, payers, and biopharma optimizing care delivery and commercial models.",
    description:
      "From provider operations to biopharma commercial strategy, we deliver outcomes that improve care quality and economic value.",
    icon: HeartPulse,
    highlights: ["Provider operations", "Payer transformation", "Biopharma commercial"],
  },
  {
    slug: "manufacturing-industrial",
    name: "Manufacturing & Industrial",
    short: "Industrial companies modernizing supply chains and factory operations.",
    description:
      "Lean operations, digital factory programs, and supply chain redesign tailored to industrial complexity.",
    icon: Factory,
    highlights: ["Digital factory", "Supply chain resilience", "Lean operations"],
  },
  {
    slug: "consumer-retail",
    name: "Consumer & Retail",
    short: "Retailers and consumer brands driving omnichannel growth and margin.",
    description:
      "Pricing, assortment, omnichannel, and operating model programs that deliver measurable top- and bottom-line impact.",
    icon: ShoppingBag,
    highlights: ["Omnichannel strategy", "Pricing & promotions", "Store operations"],
  },
  {
    slug: "energy-utilities",
    name: "Energy & Utilities",
    short: "Utilities and energy companies leading the transition.",
    description:
      "Strategy and execution support for grid modernization, energy transition, and asset performance.",
    icon: Zap,
    highlights: ["Energy transition", "Grid modernization", "Asset performance"],
  },
  {
    slug: "logistics-transportation",
    name: "Logistics & Transportation",
    short: "Carriers, 3PLs, and shippers reinventing networks and customer experience.",
    description:
      "Network design, pricing, and digital transformation programs for logistics and transportation leaders.",
    icon: Truck,
    highlights: ["Network design", "Yield management", "Last-mile operations"],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
