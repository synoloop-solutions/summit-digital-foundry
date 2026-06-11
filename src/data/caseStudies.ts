import { images } from "./images";

export interface CaseStudyMetrics {
  revenueGrowth?: string;
  costReduction?: string;
  processEfficiency?: string;
  customerSatisfaction?: string;
  timeSaved?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  industrySlug: string;
  service: string;
  serviceSlug: string;
  year: number;
  image: string;
  summary: string;
  challenge: string;
  approach: string[];
  outcome: string;
  metrics: CaseStudyMetrics;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "global-bank-core-modernization",
    title: "Core banking modernization at a global bank",
    client: "Top-10 global bank",
    industry: "Financial Services",
    industrySlug: "financial-services",
    service: "Digital Transformation",
    serviceSlug: "digital-transformation",
    year: 2025,
    image: images.case1,
    summary:
      "We led a multi-year core banking modernization that retired legacy mainframes and stood up a cloud-native banking platform across 14 markets.",
    challenge:
      "Decades of legacy infrastructure had created brittle integrations, six-week release cycles, and rising operating costs. Regulatory pressure required a credible modernization plan.",
    approach: [
      "Defined a target operating model and reference architecture",
      "Established a 200-person delivery factory with shared squads",
      "Migrated 9 country instances to a cloud-native core",
      "Implemented MLOps and observability tooling end-to-end",
    ],
    outcome:
      "Within 30 months the bank closed two mainframe data centers, halved unit operating cost, and shipped weekly to production.",
    metrics: {
      revenueGrowth: "+18%",
      costReduction: "-32%",
      processEfficiency: "+58%",
      customerSatisfaction: "82 NPS",
      timeSaved: "12,000 hrs/yr",
    },
  },
  {
    slug: "health-system-throughput",
    title: "Doubling surgical throughput at a regional health system",
    client: "12-hospital health system",
    industry: "Healthcare & Life Sciences",
    industrySlug: "healthcare-life-sciences",
    service: "Operations Excellence",
    serviceSlug: "operations-excellence",
    year: 2024,
    image: images.case2,
    summary:
      "We redesigned perioperative flow and capacity planning to nearly double surgical throughput without adding ORs.",
    challenge:
      "OR utilization sat at 58% while waitlists grew. Surgeons cited scheduling friction; nursing reported burnout.",
    approach: [
      "Diagnostic on 18-month scheduling and case data",
      "Redesigned block scheduling and turnover protocols",
      "Implemented daily huddles and a real-time capacity board",
      "Coached 40+ frontline leaders on standard work",
    ],
    outcome:
      "OR utilization moved from 58% to 84% in 9 months, with measurable improvements in staff engagement and patient experience.",
    metrics: {
      revenueGrowth: "+24%",
      costReduction: "-9%",
      processEfficiency: "+48%",
      customerSatisfaction: "+22 pts CSAT",
      timeSaved: "9,400 hrs/yr",
    },
  },
  {
    slug: "industrial-supply-chain-resilience",
    title: "Building a resilient supply chain at an industrial manufacturer",
    client: "$4B industrial manufacturer",
    industry: "Manufacturing & Industrial",
    industrySlug: "manufacturing-industrial",
    service: "Operations Excellence",
    serviceSlug: "operations-excellence",
    year: 2024,
    image: images.case3,
    summary:
      "We redesigned the global supply network and standing inventory policy to reduce stockouts while freeing working capital.",
    challenge:
      "Pandemic-era stockpiles ballooned inventory by 40% without resolving service issues on critical SKUs.",
    approach: [
      "Segmentation of 12,000 SKUs and tiered service policies",
      "Multi-echelon inventory optimization",
      "Supplier dual-sourcing program for top 200 parts",
      "S&OP redesign with monthly executive cadence",
    ],
    outcome:
      "$220M freed from working capital, on-time delivery up 11 points, and stockouts on critical SKUs cut by two-thirds.",
    metrics: {
      revenueGrowth: "+6%",
      costReduction: "-14%",
      processEfficiency: "+36%",
      customerSatisfaction: "+11 OTIF",
      timeSaved: "5,800 hrs/yr",
    },
  },
  {
    slug: "specialty-retailer-omnichannel",
    title: "Omnichannel reinvention at a specialty retailer",
    client: "North-American specialty retailer",
    industry: "Consumer & Retail",
    industrySlug: "consumer-retail",
    service: "Strategy Consulting",
    serviceSlug: "strategy-consulting",
    year: 2025,
    image: images.case4,
    summary:
      "We rebuilt the omnichannel strategy, store operating model, and pricing engine to return the brand to profitable growth.",
    challenge:
      "Digital share had stalled at 18% while store traffic declined for six quarters running.",
    approach: [
      "Customer segmentation and journey rebuild",
      "Store fleet rationalization and format redesign",
      "Dynamic pricing pilot in 80 stores",
      "Marketing mix modeling and channel reallocation",
    ],
    outcome:
      "Comparable sales returned to growth within two quarters; digital share grew to 27%.",
    metrics: {
      revenueGrowth: "+19%",
      costReduction: "-7%",
      processEfficiency: "+22%",
      customerSatisfaction: "76 NPS",
      timeSaved: "3,200 hrs/yr",
    },
  },
  {
    slug: "utility-grid-modernization",
    title: "Grid modernization at a regulated utility",
    client: "Investor-owned utility",
    industry: "Energy & Utilities",
    industrySlug: "energy-utilities",
    service: "Digital Transformation",
    serviceSlug: "digital-transformation",
    year: 2023,
    image: images.case5,
    summary:
      "We accelerated the utility's grid modernization program, delivering a unified ADMS platform across three operating regions.",
    challenge:
      "A decade of siloed grid investments had produced inconsistent data, slow outage response, and rising regulatory risk.",
    approach: [
      "Unified ADMS architecture and roadmap",
      "Field force operating model redesign",
      "Outage analytics and predictive maintenance",
      "Regulatory engagement strategy",
    ],
    outcome:
      "SAIDI down 22%, customer complaints down 31%, and the program was approved for a $1.2B rate-base recovery.",
    metrics: {
      revenueGrowth: "+8%",
      costReduction: "-12%",
      processEfficiency: "+41%",
      customerSatisfaction: "-31% complaints",
      timeSaved: "16,000 hrs/yr",
    },
  },
  {
    slug: "logistics-network-redesign",
    title: "Network redesign at a national logistics provider",
    client: "National 3PL",
    industry: "Logistics & Transportation",
    industrySlug: "logistics-transportation",
    service: "Operations Excellence",
    serviceSlug: "operations-excellence",
    year: 2024,
    image: images.case6,
    summary:
      "We redesigned the hub-and-spoke network, last-mile partner mix, and pricing engine to restore margin and service.",
    challenge:
      "Margins eroded for eight straight quarters and large customers were threatening to leave over service levels.",
    approach: [
      "Network optimization across 38 hubs",
      "Last-mile partner rationalization",
      "Pricing and yield management redesign",
      "Customer experience overhaul",
    ],
    outcome:
      "EBITDA up $148M annualized, service levels +9 points, and a multi-year contract secured with the largest account.",
    metrics: {
      revenueGrowth: "+14%",
      costReduction: "-18%",
      processEfficiency: "+33%",
      customerSatisfaction: "+9 pts OTD",
      timeSaved: "7,500 hrs/yr",
    },
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
