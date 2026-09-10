import { MapPin } from "lucide-react";
import type { SalesPerformance } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { PerformanceBadge } from "./PerformanceBadge";

interface SalesTableProps {
  sales: SalesPerformance[];
}

// Helper untuk mengambil inisial nama (maksimal 2 huruf)
const getInitials = (name: string) => 
  name.split(" ").map((part) => part[0]).slice(0, 2).join("");

export function SalesTable({ sales }: SalesTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_-24px_rgba(15,23,42,0.5)]">
      
      {/* HEADER */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5 sm:px-5">
        <div>
          <h2 className="text-sm font-bold text-slate-950 sm:text-base">Daftar Performa Salesman</h2>
          <p className="mt-0.5 text-[11px] text-slate-400">Detail performa berdasarkan filter aktif.</p>
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
          {sales.length} sales
        </span>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-215 text-left text-xs">
          
          <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-3 font-bold">Salesman</th>
              <th className="px-3 py-3 font-bold">Area</th>
              <th className="px-3 py-3 text-center font-bold">Visit</th>
              <th className="px-3 py-3 text-center font-bold">Unplanned</th>
              <th className="px-3 py-3 text-center font-bold">Efektivitas</th>
              <th className="px-3 py-3 text-right font-bold">Order</th>
              <th className="px-3 py-3 text-center font-bold">OOS</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {sales.map((item, index) => (
              <tr key={item.nama_sales} className="transition hover:bg-slate-50/70">
                
                {/* SALESMAN */}
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                      {getInitials(item.nama_sales)}
                    </div>
                    <div>
                      <p className="whitespace-nowrap font-semibold text-slate-900">{item.nama_sales}</p>
                      <p className="text-[9px] text-slate-400">Sales #{String(index + 1).padStart(2, "0")}</p>
                    </div>
                  </div>
                </td>

                {/* AREA */}
                <td className="px-3 py-3">
                  <span className="inline-flex items-center gap-1 text-slate-600">
                    <MapPin size={12} className="shrink-0 text-slate-400" />
                    <span className="whitespace-nowrap">{item.area}</span>
                  </span>
                </td>

                {/* VISIT */}
                <td className="px-3 py-3 text-center">
                  <span className="font-semibold text-slate-900">{item.kunjungan_realisasi}</span>
                  <span className="text-slate-400">/{item.kunjungan_planned}</span>
                </td>

                {/* UNPLANNED */}
                <td className="px-3 py-3 text-center">
                  <span className={item.kunjungan_unplanned > 0 ? "font-semibold text-slate-700" : "text-slate-400"}>
                    {item.kunjungan_unplanned}
                  </span>
                </td>

                {/* EFFECTIVENESS */}
                <td className="px-3 py-3 flex justify-center">
                  <PerformanceBadge percentage={item.efektivitas_visit_persen} />
                </td>

                {/* ORDER */}
                <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-slate-900">
                  {formatCurrency(item.total_order_rp)}
                </td>

                {/* OOS */}
                <td className="px-3 py-3 text-center">
                  <span className={item.jumlah_order_oos > 0 ? "font-bold text-amber-600" : "text-slate-400"}>
                    {item.jumlah_order_oos}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE */}
      {sales.length === 0 && (
        <div className="px-5 py-12 text-center">
          <p className="text-sm font-semibold text-slate-700">Data salesman tidak ditemukan.</p>
          <p className="mt-1 text-xs text-slate-400">Coba ubah kata pencarian atau filter area.</p>
        </div>
      )}

    </div>
  );
}