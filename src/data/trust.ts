export interface LogoItem { name: string; }
export interface Certification { name: string; issuer: string; year: number; }
export interface Award { name: string; issuer: string; year: number; }
export interface Membership { name: string; }

export const clientLogos: LogoItem[] = [
  { name: "Northwind" }, { name: "Atlas Bank" }, { name: "Meridian Health" },
  { name: "Helix Industrial" }, { name: "Vertex Retail" }, { name: "Polaris Energy" },
  { name: "Cascade Logistics" }, { name: "Lumen Pharma" },
];

export const certifications: Certification[] = [
  { name: "ISO 27001", issuer: "International Org. for Standardization", year: 2024 },
  { name: "SOC 2 Type II", issuer: "AICPA", year: 2025 },
  { name: "GDPR Compliant", issuer: "EU", year: 2024 },
  { name: "ISO 9001", issuer: "International Org. for Standardization", year: 2023 },
];

export const awards: Award[] = [
  { name: "Top 50 Consulting Firms", issuer: "Consulting Magazine", year: 2025 },
  { name: "Best Places to Work", issuer: "Vault", year: 2025 },
  { name: "Excellence in Digital Transformation", issuer: "MCA Awards", year: 2024 },
  { name: "Global Strategy Firm of the Year", issuer: "Strategy Quarterly", year: 2024 },
];

export const memberships: Membership[] = [
  { name: "ICMCI" },
  { name: "Management Consultancies Association" },
  { name: "AICPA" },
  { name: "Project Management Institute" },
  { name: "World Economic Forum Partner" },
];
