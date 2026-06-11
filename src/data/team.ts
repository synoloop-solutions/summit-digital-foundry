import { images } from "./images";

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  focus: string[];
  linkedin: string;
}

export const team: TeamMember[] = [
  { slug: "elena-mercado", name: "Elena Mercado", role: "Managing Partner & CEO", bio: "Elena has led 40+ transformation programs across financial services and industrials. Former partner at a Big Three consulting firm.", photo: images.avatar2, focus: ["Strategy", "Financial Services"], linkedin: "#" },
  { slug: "daniel-okafor", name: "Daniel Okafor", role: "Partner, Operations", bio: "Daniel specializes in supply chain and operating model design for global manufacturers and distributors.", photo: images.avatar6, focus: ["Operations", "Manufacturing"], linkedin: "#" },
  { slug: "sophia-laurent", name: "Sophia Laurent", role: "Partner, Digital & AI", bio: "Sophia leads our digital and AI practice, with deep expertise in cloud modernization and applied machine learning.", photo: images.avatar4, focus: ["Digital", "AI/ML"], linkedin: "#" },
  { slug: "marcus-tan", name: "Marcus Tan", role: "Partner, Financial Advisory", bio: "Marcus is a former CFO who advises clients on finance transformation, M&A diligence, and capital strategy.", photo: images.avatar7, focus: ["Finance", "M&A"], linkedin: "#" },
  { slug: "amara-johnson", name: "Amara Johnson", role: "Partner, Healthcare", bio: "Amara partners with health systems and biopharma leaders to deliver clinical and commercial outcomes.", photo: images.avatar1, focus: ["Healthcare", "Operations"], linkedin: "#" },
  { slug: "rohan-patel", name: "Rohan Patel", role: "Partner, Risk & Compliance", bio: "Rohan leads regulatory remediation and enterprise risk programs for global banks and insurers.", photo: images.avatar8, focus: ["Risk", "Compliance"], linkedin: "#" },
  { slug: "isabela-cruz", name: "Isabela Cruz", role: "Partner, People & Change", bio: "Isabela helps executive teams align leadership, culture, and capability to make transformation stick.", photo: images.avatar5, focus: ["Change", "Leadership"], linkedin: "#" },
  { slug: "henry-blake", name: "Henry Blake", role: "Partner, Energy", bio: "Henry advises utilities and energy companies on the transition, grid modernization, and asset performance.", photo: images.avatar3, focus: ["Energy", "Strategy"], linkedin: "#" },
];

export const getTeamMember = (slug: string) => team.find((t) => t.slug === slug);
