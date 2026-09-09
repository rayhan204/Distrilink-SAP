import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  tone: "blue" | "emerald" | "violet" | "amber";
}

const toneClasses = {
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  violet: "bg-violet-50 text-violet-600",
  amber: "bg-amber-50 text-amber-600",
};

export function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
}: SummaryCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_-24px_rgba(15,23,42,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_35px_-24px_rgba(15,23,42,0.55)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        
        {/* TEXT CONTENT */}
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-slate-500 sm:text-sm">{title}</p>
          <p className="mt-2 truncate text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">{value}</p>
          <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">{description}</p>
        </div>

        {/* ICON */}
        <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl sm:h-10 sm:w-10 ${toneClasses[tone]}`}>
          <Icon size={18} strokeWidth={2} />
        </div>

      </div>
    </article>
  );
}