import { PERFORMANCE_THRESHOLDS } from "./constants";
import type { SalesPerformance } from "@/types";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getPerformanceStatus(percentage: number) {
  if (percentage >= PERFORMANCE_THRESHOLDS.EXCELLENT) return "Excellent";
  if (percentage >= PERFORMANCE_THRESHOLDS.GOOD) return "Good";
  if (percentage >= PERFORMANCE_THRESHOLDS.FAIR) return "Fair";
  return "Needs Attention";
}

export function calculateSalesSummary(sales: SalesPerformance[]) {
  const totalVisits = sales.reduce((sum, item) => sum + item.kunjungan_realisasi, 0);
  const totalOrder = sales.reduce((sum, item) => sum + item.total_order_rp, 0);
  const totalOos = sales.reduce((sum, item) => sum + item.jumlah_order_oos, 0);
  const averageEffectiveness = sales.length
    ? sales.reduce((sum, item) => sum + item.efektivitas_visit_persen, 0) / sales.length
    : 0;

  return { totalVisits, totalOrder, totalOos, averageEffectiveness };
}
