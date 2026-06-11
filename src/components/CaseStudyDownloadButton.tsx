import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";
import { saveSubmission, downloadBlob } from "@/lib/storage";

export function CaseStudyDownloadButton({ caseStudy }: { caseStudy: CaseStudy }) {
  const handle = () => {
    saveSubmission("downloads", { slug: caseStudy.slug, title: caseStudy.title });
    const m = caseStudy.metrics;
    // Mock "PDF" — a structured plain-text file with .pdf extension is sufficient as a placeholder download.
    const text = [
      "SUMMIT ADVISORY GROUP — CASE STUDY",
      "==================================",
      "",
      caseStudy.title,
      `Client: ${caseStudy.client}`,
      `Industry: ${caseStudy.industry}   |   Service: ${caseStudy.service}   |   Year: ${caseStudy.year}`,
      "",
      "SUMMARY",
      "-------",
      caseStudy.summary,
      "",
      "CHALLENGE",
      "---------",
      caseStudy.challenge,
      "",
      "APPROACH",
      "--------",
      ...caseStudy.approach.map((a, i) => `${i + 1}. ${a}`),
      "",
      "OUTCOME",
      "-------",
      caseStudy.outcome,
      "",
      "KEY METRICS",
      "-----------",
      `Revenue growth:        ${m.revenueGrowth ?? "—"}`,
      `Cost reduction:        ${m.costReduction ?? "—"}`,
      `Process efficiency:    ${m.processEfficiency ?? "—"}`,
      `Customer satisfaction: ${m.customerSatisfaction ?? "—"}`,
      `Time saved:            ${m.timeSaved ?? "—"}`,
      "",
      "© Summit Advisory Group. Confidential preview.",
    ].join("\n");
    downloadBlob(`${caseStudy.slug}.pdf`, text, "application/pdf");
  };
  return (
    <Button onClick={handle} size="lg" className="bg-[var(--navy-deep)] hover:bg-[var(--navy)] text-white">
      <Download className="h-4 w-4" /> Download Full Case Study
    </Button>
  );
}
