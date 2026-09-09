import { getPerformanceStatus } from "@/lib/utils";

interface PerformanceBadgeProps {
  percentage: number;
}

export function PerformanceBadge({ percentage }: PerformanceBadgeProps) {
  const status = getPerformanceStatus(percentage);
  const statusClass = {
    Excellent: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    Good: "bg-blue-50 text-blue-700 ring-blue-600/10",
    Fair: "bg-amber-50 text-amber-700 ring-amber-600/10",
    "Needs Attention": "bg-red-50 text-red-700 ring-red-600/10",
  }[status];

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${statusClass}`}>
      {percentage}%
    </span>
  );
}
