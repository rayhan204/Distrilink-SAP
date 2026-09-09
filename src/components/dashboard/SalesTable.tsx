import { MapPin } from "lucide-react";
import type { SalesPerformance } from "@/types/sales";
import { formatCurrency } from "@/lib/utils";
import { PerformanceBadge } from "./PerformanceBadge";

interface SalesTableProps {
  sales: SalesPerformance[];
}

export function SalesTable({ sales }: SalesTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_-24px_rgba(15,23,42,0.5)]">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-base font-bold text-slate-950">Daftar Performa Sales</h2>
          <p className="mt-1 text-sm text-slate-400">Detail aktivitas kunjungan dan order berdasarkan filter aktif.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{sales.length} sales</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-245 text-left text-sm">
          <thead className="bg-slate-50/80 text-[11px] uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3.5 font-bold">Salesman</th>
              <th className="px-5 py-3.5 font-bold">Area</th>
              <th className="px-5 py-3.5 text-center font-bold">Planned</th>
              <th className="px-5 py-3.5 text-center font-bold">Unplanned</th>
              <th className="px-5 py-3.5 text-center font-bold">Realisasi</th>
              <th className="px-5 py-3.5 text-center font-bold">Efektivitas</th>
              <th className="px-5 py-3.5 text-right font-bold">Total Order</th>
              <th className="px-5 py-3.5 text-center font-bold">OOS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sales.map((item, index) => (
              <tr key={item.nama_sales} className="transition hover:bg-slate-50/70">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                      {item.nama_sales.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.nama_sales}</p>
                      <p className="text-xs text-slate-400">Sales #{String(index + 1).padStart(2, "0")}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 text-slate-600">
                    <MapPin size={14} className="text-slate-400" />
                    {item.area}
                  </span>
                </td>
                <td className="px-5 py-4 text-center text-slate-600">{item.kunjungan_planned}</td>
                <td className="px-5 py-4 text-center text-slate-600">{item.kunjungan_unplanned}</td>
                <td className="px-5 py-4 text-center font-semibold text-slate-900">{item.kunjungan_realisasi}</td>
                <td className="px-5 py-4 text-center"><PerformanceBadge percentage={item.efektivitas_visit_persen} /></td>
                <td className="px-5 py-4 text-right font-semibold text-slate-900">{formatCurrency(item.total_order_rp)}</td>
                <td className="px-5 py-4 text-center">
                  <span className={item.jumlah_order_oos > 0 ? "font-semibold text-amber-600" : "text-slate-400"}>{item.jumlah_order_oos}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sales.length === 0 && (
        <div className="px-5 py-14 text-center">
          <p className="text-sm font-semibold text-slate-700">Data salesman tidak ditemukan.</p>
          <p className="mt-1 text-sm text-slate-400">Coba ubah kata pencarian atau filter area.</p>
        </div>
      )}
    </div>
  );
}
