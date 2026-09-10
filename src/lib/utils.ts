import { PERFORMANCE_THRESHOLDS } from "./constants";
import type { SalesPerformance } from "@/types";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

// Formula resmi efektivitas visit: (kunjungan_realisasi / kunjungan_planned) x 100.
// Dihitung di sini (bukan disimpan sebagai field statis di dataset) agar nilainya
// selalu akurat mengikuti kunjungan_planned & kunjungan_realisasi terbaru —
// menghindari data yang tidak sinkron kalau salah satu angka diubah manual.
export function calculateVisitEffectiveness(sales: SalesPerformance): number {
  if (sales.kunjungan_planned <= 0) return 0;
  return (sales.kunjungan_realisasi / sales.kunjungan_planned) * 100;
}

export function getPerformanceStatus(percentage: number) {
  if (percentage >= PERFORMANCE_THRESHOLDS.EXCELLENT) return "Excellent";
  if (percentage >= PERFORMANCE_THRESHOLDS.GOOD) return "Good";
  if (percentage >= PERFORMANCE_THRESHOLDS.FAIR) return "Fair";
  return "Needs Attention";
}

export interface SalesSummary {
  visits: number;
  effectiveness: number;
  order: number;
  oos: number;
}

// Sumber tunggal untuk kalkulasi summary dashboard (Total Visit, Rata-rata
// Efektivitas, Total Order, Order OOS). Dipakai di app/dashboard/page.tsx
// agar logic perhitungan tidak diduplikasi di dua tempat.
export function calculateSalesSummary(sales: SalesPerformance[]): SalesSummary {
  const visits = sales.reduce((sum, item) => sum + item.kunjungan_realisasi, 0);
  const order = sales.reduce((sum, item) => sum + item.total_order_rp, 0);
  const oos = sales.reduce((sum, item) => sum + item.jumlah_order_oos, 0);
  const effectiveness = sales.length
    ? sales.reduce((sum, item) => sum + calculateVisitEffectiveness(item), 0) / sales.length
    : 0;

  return { visits, effectiveness, order, oos };
}
