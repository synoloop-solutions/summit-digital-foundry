import { images } from "./images";

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  focus: string[];
  linkedin: string;
  experience?: string[];
  education?: string[];
  caseStudies?: string[];
}

export const team: TeamMember[] = [
  {
    slug: "elena-mercado",
    name: "Elena Mercado",
    role: "Managing Partner & CEO",
    bio: "Elena has led 40+ transformation programs across financial services and industrials. Former partner at a Big Three consulting firm, she founded Summit in 2008 with a thesis that lean, senior teams could deliver better outcomes than traditional pyramids.",
    photo: images.avatar2,
    focus: ["Strategy", "Financial Services"],
    linkedin: "#",
    experience: [
      "Managing Partner & CEO, Summit Advisory Group (2008–present)",
      "Partner, Strategy Practice, Big Three consulting firm",
      "VP Corporate Strategy, Fortune 100 industrial",
    ],
    education: ["MBA, Wharton", "BSc Economics, LSE"],
    caseStudies: ["global-bank-core-modernization"],
  },
  {
    slug: "daniel-okafor",
    name: "Daniel Okafor",
    role: "Partner, Operations",
    bio: "Daniel specializes in supply chain and operating model design for global manufacturers and distributors. He has redesigned networks across 30+ countries.",
    photo: images.avatar6,
    focus: ["Operations", "Manufacturing"],
    linkedin: "#",
    experience: [
      "Partner, Summit Advisory Group (2014–present)",
      "Director, Supply Chain, global industrial manufacturer",
      "Consultant, top-tier operations consultancy",
    ],
    education: ["MEng Industrial Engineering, Imperial College London"],
    caseStudies: ["industrial-supply-chain-resilience", "logistics-network-redesign"],
  },
  {
    slug: "sophia-laurent",
    name: "Sophia Laurent",
    role: "Partner, Digital & AI",
    bio: "Sophia leads our digital and AI practice, with deep expertise in cloud modernization and applied machine learning at enterprise scale.",
    photo: images.avatar4,
    focus: ["Digital", "AI/ML"],
    linkedin: "#",
    experience: [
      "Partner, Summit Advisory Group (2018–present)",
      "Head of AI Engineering, global SaaS company",
      "Senior Manager, digital practice, top-tier consultancy",
    ],
    education: ["MS Computer Science, Stanford", "BS Mathematics, École Polytechnique"],
    caseStudies: ["global-bank-core-modernization"],
  },
  {
    slug: "marcus-tan",
    name: "Marcus Tan",
    role: "Partner, Financial Advisory",
    bio: "Marcus is a former CFO who advises clients on finance transformation, M&A diligence, and capital strategy across APAC and EMEA.",
    photo: images.avatar7,
    focus: ["Finance", "M&A"],
    linkedin: "#",
    experience: [
      "Partner, Summit Advisory Group (2016–present)",
      "Group CFO, listed financial services company",
      "Director, Investment Banking, bulge-bracket bank",
    ],
    education: ["MBA, INSEAD", "CFA Charterholder"],
    caseStudies: [],
  },
  {
    slug: "amara-johnson",
    name: "Amara Johnson",
    role: "Partner, Healthcare",
    bio: "Amara partners with health systems and biopharma leaders to deliver clinical and commercial outcomes at scale.",
    photo: images.avatar1,
    focus: ["Healthcare", "Operations"],
    linkedin: "#",
    experience: [
      "Partner, Summit Advisory Group (2019–present)",
      "VP Operations, integrated health system",
      "Engagement Manager, healthcare practice, top-tier consultancy",
    ],
    education: ["MPH, Johns Hopkins", "BA Biology, Yale"],
    caseStudies: ["health-system-throughput"],
  },
  {
    slug: "rohan-patel",
    name: "Rohan Patel",
    role: "Partner, Risk & Compliance",
    bio: "Rohan leads regulatory remediation and enterprise risk programs for global banks and insurers.",
    photo: images.avatar8,
    focus: ["Risk", "Compliance"],
    linkedin: "#",
    experience: [
      "Partner, Summit Advisory Group (2017–present)",
      "Director, Regulatory Affairs, global bank",
      "Senior Manager, risk practice, Big Four firm",
    ],
    education: ["JD, Columbia Law", "BA Economics, Cambridge"],
    caseStudies: [],
  },
  {
    slug: "isabela-cruz",
    name: "Isabela Cruz",
    role: "Partner, People & Change",
    bio: "Isabela helps executive teams align leadership, culture, and capability to make transformation stick.",
    photo: images.avatar5,
    focus: ["Change", "Leadership"],
    linkedin: "#",
    experience: [
      "Partner, Summit Advisory Group (2020–present)",
      "Chief People Officer, scale-up technology company",
      "Principal, organizational design practice, top-tier consultancy",
    ],
    education: ["PhD Organizational Behavior, IESE", "BA Psychology, Universidad de Barcelona"],
    caseStudies: ["specialty-retailer-omnichannel"],
  },
  {
    slug: "henry-blake",
    name: "Henry Blake",
    role: "Partner, Energy",
    bio: "Henry advises utilities and energy companies on the transition, grid modernization, and asset performance.",
    photo: images.avatar3,
    focus: ["Energy", "Strategy"],
    linkedin: "#",
    experience: [
      "Partner, Summit Advisory Group (2015–present)",
      "Director of Strategy, major utility",
      "Senior Consultant, energy practice, top-tier firm",
    ],
    education: ["MSc Energy Policy, Oxford", "MEng Mechanical Engineering, MIT"],
    caseStudies: ["utility-grid-modernization"],
  },
];

export const getTeamMember = (slug: string) => team.find((t) => t.slug === slug);
