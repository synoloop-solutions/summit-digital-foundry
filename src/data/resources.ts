export interface Resource {
  slug: string;
  title: string;
  type: "Whitepaper" | "Guide" | "Report" | "Toolkit";
  summary: string;
  pages: number;
}

export const resources: Resource[] = [
  { slug: "ai-in-financial-services-2026", title: "AI in Financial Services 2026", type: "Report", summary: "How leading banks are operationalizing AI across the front, middle, and back office.", pages: 28 },
  { slug: "cfo-agenda-playbook", title: "The CFO Agenda Playbook", type: "Guide", summary: "Five priorities reshaping the finance function — and the capabilities required.", pages: 22 },
  { slug: "operating-model-toolkit", title: "Operating Model Design Toolkit", type: "Toolkit", summary: "Templates, diagnostics, and worked examples to design a target operating model.", pages: 36 },
  { slug: "transformation-that-sticks", title: "Transformation That Sticks", type: "Whitepaper", summary: "The leadership behaviors that drive sustained adoption.", pages: 16 },
];
