import type { CaseStudyMetrics } from "@/data/caseStudies";
import { ArrowUpRight, ArrowDownRight, Gauge, Heart, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Item = { label: string; value?: string; icon: LucideIcon; tone: "green" | "blue" | "gold" | "pink" | "navy" };

export function KpiGrid({ metrics }: { metrics: CaseStudyMetrics }) {
  const items: Item[] = [
    { label: "Revenue growth", value: metrics.revenueGrowth, icon: ArrowUpRight, tone: "green" },
    { label: "Cost reduction", value: metrics.costReduction, icon: ArrowDownRight, tone: "blue" },
    { label: "Process efficiency", value: metrics.processEfficiency, icon: Gauge, tone: "navy" },
    { label: "Customer satisfaction", value: metrics.customerSatisfaction, icon: Heart, tone: "pink" },
    { label: "Time saved", value: metrics.timeSaved, icon: Clock, tone: "gold" },
  ];
  const tones: Record<Item["tone"], string> = {
    green: "text-emerald-600 bg-emerald-50",
    blue: "text-sky-700 bg-sky-50",
    navy: "text-[var(--navy-deep)] bg-[color-mix(in_oklab,var(--navy-deep)_8%,white)]",
    pink: "text-rose-600 bg-rose-50",
    gold: "text-amber-700 bg-amber-50",
  };
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div key={it.label} className="rounded-xl border border-border bg-card p-5">
            <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${tones[it.tone]}`}>
              <Icon className="h-4 w-4" />
            </div>
            <p className="mt-4 font-serif text-2xl font-semibold text-[var(--navy-deep)]">{it.value ?? "—"}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{it.label}</p>
          </div>
        );
      })}
    </div>
  );
}
