"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Activity, Banknote, CalendarCheck2, PackageX } from "lucide-react";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardFilters } from "@/components/DashboardFilters";
import { PerformanceChart } from "@/components/PerformanceChart";
import { SalesTable } from "@/components/SalesTable";
import { SummaryCard } from "@/components/SummaryCard";
import salesData from "@/data/sales.json";
import { getAuthUser } from "@/lib/auth";
import { formatCurrency } from "@/lib/utils";
import type { AuthUser, SalesPerformance } from "@/types";

const sales = salesData as SalesPerformance[];

let authSnapshot: AuthUser | null = null;
let authReady = false;
const authListeners = new Set<() => void>();

function getAuthSnapshot() { return authSnapshot; }
function getServerAuthSnapshot() { return null; }

function subscribeToAuth(listener: () => void) {
  authListeners.add(listener);
  if (!authReady) {
    authReady = true;
    const storedUser = getAuthUser();
    if (storedUser) authSnapshot = storedUser;
    queueMicrotask(() => authListeners.forEach((cb) => cb()));
  }
  return () => authListeners.delete(listener);
}

// Komponen reusable untuk state loading/redirect
const FullScreenLoader = ({ message }: { message: string }) => (
  <main className="grid min-h-screen place-items-center bg-[#f4f7fb]">
    <div className="text-center">
      <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700" />
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  </main>
);

export default function DashboardPage() {
  const router = useRouter();
  const user = useSyncExternalStore(subscribeToAuth, getAuthSnapshot, getServerAuthSnapshot);

  const [search, setSearch] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    if (authReady && !user) router.replace("/login");
  }, [user, router]);

  // Derived states
  const areas = useMemo(() => Array.from(new Set(sales.map((s) => s.area))).sort(), []);

  const filteredSales = useMemo(() => {
    const query = search.toLowerCase().trim();
    return sales.filter((item) => {
      const matchesSearch = item.nama_sales.toLowerCase().includes(query);
      const matchesArea = !area || item.area === area;
      return matchesSearch && matchesArea;
    });
  }, [search, area]);

  // Konsolidasi kalkulasi metrik menjadi 1x loop
  const metrics = useMemo(() => {
    if (!filteredSales.length) return { visits: 0, effectiveness: 0, order: 0, oos: 0 };

    const totals = filteredSales.reduce((acc, curr) => {
      acc.visits += curr.kunjungan_realisasi;
      acc.effectiveness += curr.efektivitas_visit_persen;
      acc.order += curr.total_order_rp;
      acc.oos += curr.jumlah_order_oos;
      return acc;
    }, { visits: 0, effectiveness: 0, order: 0, oos: 0 });

    totals.effectiveness /= filteredSales.length;
    return totals;
  }, [filteredSales]);

  if (!authReady) return <FullScreenLoader message="Memeriksa sesi login..." />;
  if (!user) return <FullScreenLoader message="Mengarahkan ke halaman login..." />;

  const SUMMARY_CARDS = [
    { title: "Total Visit Hari Ini", value: metrics.visits.toString(), desc: "Total kunjungan realisasi", icon: CalendarCheck2, tone: "blue" },
    { title: "Rata-rata Efektivitas", value: `${metrics.effectiveness.toFixed(1)}%`, desc: "Rata-rata sales terpilih", icon: Activity, tone: "emerald" },
    { title: "Total Order", value: formatCurrency(metrics.order), desc: "Nilai order sales terpilih", icon: Banknote, tone: "violet" },
    { title: "Order OOS", value: metrics.oos.toString(), desc: "Pesanan gagal karena stok", icon: PackageX, tone: "amber" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <DashboardHeader userName={`${user.firstName} ${user.lastName}`} />

      <main className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
        
        {/* PAGE HEADING */}
        <section className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-600">Dashboard</p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Analisa Performa Salesman</h1>
            <p className="mt-1.5 text-sm text-slate-500">Pantau efektivitas kunjungan, nilai order, dan kendala OOS tim sales.</p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-500 shadow-sm">
            <CalendarCheck2 size={15} className="text-sky-600" /> Data performa hari ini
          </div>
        </section>

        {/* SUMMARY CARDS */}
        <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {SUMMARY_CARDS.map((card, idx) => (
            <SummaryCard 
              key={idx}
              title={card.title} 
              value={card.value} 
              description={card.desc} 
              icon={card.icon} 
              tone={card.tone} 
            />
          ))}
        </section>

        {/* MAIN CONTENT */}
        <section className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">
          <div className="min-w-0">
            <DashboardFilters
              search={search}
              area={area}
              areas={areas}
              onSearchChange={setSearch}
              onAreaChange={setArea}
              onReset={() => { setSearch(""); setArea(""); }}
            />
            <div className="mt-4">
              <SalesTable sales={filteredSales} />
            </div>
          </div>
          <div className="min-w-0">
            <PerformanceChart sales={filteredSales} />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-5 flex flex-col justify-between gap-2 border-t border-slate-200 pt-4 text-xs text-slate-400 sm:flex-row">
          <span>© {new Date().getFullYear()} DISTRILINK. Sales Performance Dashboard.</span>
          <span className="italic">Better Data. Better Sales.</span>
        </footer>

      </main>
    </div>
  );
}