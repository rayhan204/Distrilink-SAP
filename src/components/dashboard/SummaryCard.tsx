import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  tone: "blue" | "emerald" | "violet";
}

const toneClasses = {
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  violet: "bg-violet-50 text-violet-600",
};

export function SummaryCard({ title, value, description, icon: Icon, tone }: SummaryCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_-24px_rgba(15,23,42,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_35px_-24px_rgba(15,23,42,0.55)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{value}</p>
          <p className="mt-1.5 text-xs text-slate-400">{description}</p>
        </div>
        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${toneClasses[tone]}`}>
          <Icon size={19} strokeWidth={2} />
        </div>
      </div>
    </article>
  );
}
