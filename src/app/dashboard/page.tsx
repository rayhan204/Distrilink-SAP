"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Banknote,
  CalendarCheck2,
  PackageX,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardFilters } from "@/components/DashboardFilters";
import { PerformanceChart } from "@/components/PerformanceChart";
import { SalesTable } from "@/components/SalesTable";
import { SummaryCard } from "@/components/SummaryCard";

import salesData from "@/data/sales.json";
import { formatCurrency } from "@/lib/utils";
import { useAuthUser } from "@/hooks/useAuthUser";

import type { SalesPerformance } from "@/types";

const sales = salesData as SalesPerformance[];

function FullScreenLoader({ message }: { message: string }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f4f7fb]">
      <div className="text-center">
        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700" />

        <p className="text-sm text-slate-500">
          {message}
        </p>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuthUser();

  const [search, setSearch] = useState("");
  const [area, setArea] = useState("");

  // Redirect jika belum login
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  // Daftar area untuk filter
  const areas = useMemo(
    () => [...new Set(sales.map((item) => item.area))].sort(),
    []
  );

  // Filter sales
  const filteredSales = useMemo(() => {
    const query = search.toLowerCase().trim();

    return sales.filter((item) => {
      const matchesSearch = item.nama_sales
        .toLowerCase()
        .includes(query);

      const matchesArea =
        !area || item.area === area;

      return matchesSearch && matchesArea;
    });
  }, [search, area]);

  // Hitung seluruh metrik
  const metrics = useMemo(() => {
    const result = filteredSales.reduce(
      (acc, item) => ({
        visits:
          acc.visits + item.kunjungan_realisasi,

        effectiveness:
          acc.effectiveness +
          item.efektivitas_visit_persen,

        order:
          acc.order + item.total_order_rp,

        oos:
          acc.oos + item.jumlah_order_oos,
      }),
      {
        visits: 0,
        effectiveness: 0,
        order: 0,
        oos: 0,
      }
    );

    return {
      visits: result.visits,
      effectiveness: filteredSales.length
        ? result.effectiveness / filteredSales.length
        : 0,
      order: result.order,
      oos: result.oos,
    };
  }, [filteredSales]);

  // Loading session
  if (loading) {
    return (
      <FullScreenLoader message="Memeriksa sesi login..." />
    );
  }

  // Belum login
  if (!user) {
    return (
      <FullScreenLoader message="Mengarahkan ke halaman login..." />
    );
  }

  const summaryCards = [
    {
      title: "Total Visit Hari Ini",
      value: metrics.visits.toString(),
      description: "Total kunjungan realisasi",
      icon: CalendarCheck2,
      tone: "blue",
    },
    {
      title: "Rata-rata Efektivitas",
      value: `${metrics.effectiveness.toFixed(1)}%`,
      description: "Rata-rata sales terpilih",
      icon: Activity,
      tone: "emerald",
    },
    {
      title: "Total Order",
      value: formatCurrency(metrics.order),
      description: "Nilai order sales terpilih",
      icon: Banknote,
      tone: "violet",
    },
    {
      title: "Order OOS",
      value: metrics.oos.toString(),
      description: "Pesanan gagal karena stok",
      icon: PackageX,
      tone: "amber",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <DashboardHeader
        userName={`${user.firstName} ${user.lastName}`}
      />

      <main className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-6">

        {/* HEADER */}
        <section className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-600">
              Dashboard
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Analisa Performa Salesman
            </h1>

            <p className="mt-1.5 text-sm text-slate-500">
              Pantau efektivitas kunjungan, nilai order, dan
              kendala OOS tim sales.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-500 shadow-sm">
            <CalendarCheck2
              size={15}
              className="text-sky-600"
            />

            Data performa hari ini
          </div>
        </section>

        {/* SUMMARY */}
        <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <SummaryCard
              key={card.title}
              title={card.title}
              value={card.value}
              description={card.description}
              icon={card.icon}
              tone={card.tone}
            />
          ))}
        </section>

        {/* TABLE + CHART */}
        <section className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">

          {/* LEFT */}
          <div className="min-w-0">
            <DashboardFilters
              search={search}
              area={area}
              areas={areas}
              onSearchChange={setSearch}
              onAreaChange={setArea}
              onReset={() => {
                setSearch("");
                setArea("");
              }}
            />

            <div className="mt-4">
              <SalesTable sales={filteredSales} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="min-w-0">
            <PerformanceChart sales={filteredSales} />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-5 flex flex-col justify-between gap-2 border-t border-slate-200 pt-4 text-xs text-slate-400 sm:flex-row">
          <span>
            © {new Date().getFullYear()} DISTRILINK.
            Sales Performance Dashboard.
          </span>

          <span className="italic">
            Better Data. Better Sales.
          </span>
        </footer>
      </main>
    </div>
  );
}