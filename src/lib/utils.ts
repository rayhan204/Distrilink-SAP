import { PERFORMANCE_THRESHOLDS } from "./constants";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getPerformanceStatus(
  percentage: number
): "Excellent" | "Good" | "Fair" | "Needs Attention" {
  if (percentage >= PERFORMANCE_THRESHOLDS.EXCELLENT) {
    return "Excellent";
  }

  if (percentage >= PERFORMANCE_THRESHOLDS.GOOD) {
    return "Good";
  }

  if (percentage >= PERFORMANCE_THRESHOLDS.FAIR) {
    return "Fair";
  }

  return "Needs Attention";
}