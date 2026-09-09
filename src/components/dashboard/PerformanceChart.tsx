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
import type { SalesPerformance } from "@/types/sales";

interface PerformanceChartProps {
  sales: SalesPerformance[];
}

export function PerformanceChart({ sales }: PerformanceChartProps) {
  const chartData = sales.map((item) => ({
    name: item.nama_sales.split(" ")[0],
    fullName: item.nama_sales,
    efektivitas: item.efektivitas_visit_persen,
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_-24px_rgba(15,23,42,0.5)] sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-950">Efektivitas Visit</h2>
          <p className="mt-1 text-sm text-slate-400">Perbandingan efektivitas kunjungan setiap salesman.</p>
        </div>
        <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-500">0–100%</span>
      </div>

      {sales.length > 0 ? (
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: -18, bottom: 8 }} barCategoryGap="28%">
              <CartesianGrid stroke="#e8edf3" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(value) => `${value}%`} />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(15,23,42,.08)" }}
                formatter={(value) => [`${value}%`, "Efektivitas"]}
                labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName ?? label}
              />
              <Bar dataKey="efektivitas" radius={[6, 6, 2, 2]}>
                {chartData.map((entry) => (
                  <Cell key={entry.fullName} fill={entry.efektivitas >= 90 ? "#10b981" : entry.efektivitas >= 80 ? "#2563eb" : entry.efektivitas >= 70 ? "#f59e0b" : "#ef4444"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="grid h-75 place-items-center rounded-xl bg-slate-50 text-sm text-slate-400">
          Tidak ada data untuk ditampilkan.
        </div>
      )}
    </div>
  );
}
