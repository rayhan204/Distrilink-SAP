"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SalesPerformance } from "@/types";
import { calculateVisitEffectiveness } from "@/lib/utils";

interface PerformanceChartProps {
  sales: SalesPerformance[];
}

// Helper untuk menentukan warna berdasarkan efektivitas
const getBarColor = (value: number) => {
  if (value >= 90) return "#10b981"; // Emerald (Sangat Baik)
  if (value >= 80) return "#2563eb"; // Biru (Baik)
  if (value >= 70) return "#f59e0b"; // Kuning (Cukup)
  return "#ef4444";                  // Merah (Kurang)
};

export function PerformanceChart({ sales }: PerformanceChartProps) {
  const chartData = sales.map((item) => ({
    name: item.nama_sales.split(" ")[0],
    fullName: item.nama_sales,
    efektivitas: Math.round(calculateVisitEffectiveness(item)),
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_-24px_rgba(15,23,42,0.5)] sm:p-5">
      
      {/* HEADER */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-950 sm:text-base">Efektivitas Visit</h2>
          <p className="mt-1 text-xs text-slate-400">Perbandingan efektivitas tiap salesman.</p>
        </div>
        <span className="shrink-0 rounded-lg bg-slate-50 px-2 py-1.5 text-[10px] font-bold text-slate-500">
          0–100%
        </span>
      </div>

      {/* CHART */}
      {sales.length > 0 ? (
        <div className="h-67.5 w-full sm:h-75">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 18, right: 4, left: -22, bottom: 5 }} barCategoryGap="25%">
              
              <CartesianGrid stroke="#e8edf3" strokeDasharray="4 4" vertical={false} />
              
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
              
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(val) => `${val}%`} />
              
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(15,23,42,.08)", fontSize: 12 }}
                formatter={(val) => [`${val}%`, "Efektivitas"]}
                labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName ?? label}
              />
              
              <Bar dataKey="efektivitas" radius={[6, 6, 2, 2]} maxBarSize={46}>
                {chartData.map((entry) => (
                  <Cell key={entry.fullName} fill={getBarColor(entry.efektivitas)} />
                ))}
              </Bar>

            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="grid h-67.5 place-items-center rounded-xl bg-slate-50 text-center text-xs text-slate-400">
          Tidak ada data untuk ditampilkan.
        </div>
      )}

      {/* LEGEND */}
      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-[10px] text-slate-400">
        <span>🟢 ≥ 90%</span>
        <span>🔵 80–89%</span>
        <span>🟡 70–79%</span>
        <span>🔴 &lt; 70%</span>
      </div>

    </div>
  );
}