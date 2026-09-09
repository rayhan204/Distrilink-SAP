"use client";

import {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import {
  ClipboardCheck,
  ShoppingCart,
  Target,
} from "lucide-react";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { SalesTable } from "@/components/dashboard/SalesTable";
import { SummaryCard } from "@/components/dashboard/SummaryCard";

import salesData from "@/data/sales-performance.json";
import { getAuthUser } from "@/lib/auth";
import { formatCurrency } from "@/lib/utils";
import type { SalesPerformance } from "@/types/sales";
import type { AuthUser } from "@/types/auth";

const sales = salesData as SalesPerformance[];

/**
 * Cached authentication snapshot.
 *
 * useSyncExternalStore requires getSnapshot() to return
 * the same value when the external state has not changed.
 */
let authSnapshot: AuthUser | null = null;
let authInitialized = false;

function getClientAuthUser(): AuthUser | null {
  if (!authInitialized) {
    authSnapshot = getAuthUser();
    authInitialized = true;
  }

  return authSnapshot;
}

function getServerAuthUser(): AuthUser | null {
  return null;
}

function subscribeToAuth(callback: () => void) {
  function handleStorageChange(event: StorageEvent) {
    if (event.key === "distrilink_auth") {
      authSnapshot = getAuthUser();
      callback();
    }
  }

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener(
      "storage",
      handleStorageChange
    );
  };
}

export default function DashboardPage() {
  const router = useRouter();

  const user = useSyncExternalStore(
    subscribeToAuth,
    getClientAuthUser,
    getServerAuthUser
  );

  const [search, setSearch] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  const areas = useMemo(() => {
    return Array.from(
      new Set(sales.map((item) => item.area))
    ).sort();
  }, []);

  const filteredSales = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return sales.filter((item) => {
      const matchesSearch = item.nama_sales
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesArea =
        !area || item.area === area;

      return matchesSearch && matchesArea;
    });
  }, [search, area]);

  const totalVisits = useMemo(() => {
    return filteredSales.reduce(
      (total, item) =>
        total + item.kunjungan_realisasi,
      0
    );
  }, [filteredSales]);

  const averageEffectiveness = useMemo(() => {
    if (filteredSales.length === 0) {
      return 0;
    }

    const total = filteredSales.reduce(
      (sum, item) =>
        sum + item.efektivitas_visit_persen,
      0
    );

    return total / filteredSales.length;
  }, [filteredSales]);

  const totalOrder = useMemo(() => {
    return filteredSales.reduce(
      (total, item) =>
        total + item.total_order_rp,
      0
    );
  }, [filteredSales]);

  if (!user) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4f7fb]">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-800" />

          <p className="text-sm font-medium text-slate-600">
            Memuat dashboard...
          </p>
        </div>
      </main>
    );
  }

  const userName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <DashboardHeader userName={userName} />

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
        {/* Page Heading */}
        <div className="mb-7">
          <p className="mb-1 text-sm font-medium text-slate-500">
            Sales Performance
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Analisa Performa Salesman
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Pantau aktivitas kunjungan, efektivitas visit,
            dan pencapaian order tim sales.
          </p>
        </div>

        {/* Summary */}
        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            title="Total Visit Hari Ini"
            value={totalVisits.toString()}
            description="Total kunjungan realisasi"
            icon={ClipboardCheck}
            tone="blue"
          />

          <SummaryCard
            title="Rata-rata Efektivitas Visit"
            value={`${averageEffectiveness.toFixed(1)}%`}
            description="Rata-rata performa tim"
            icon={Target}
            tone="emerald"
          />

          <SummaryCard
            title="Total Order"
            value={formatCurrency(totalOrder)}
            description="Nilai order seluruh salesman"
            icon={ShoppingCart}
            tone="violet"
          />
        </section>

        {/* Filters */}
        <section className="mb-6">
          <DashboardFilters
            search={search}
            area={area}
            areas={areas}
            onSearchChange={setSearch}
            onAreaChange={setArea}
          />
        </section>

        {/* Chart */}
        <section className="mb-6">
          <PerformanceChart sales={filteredSales} />
        </section>

        {/* Table */}
        <section>
          <SalesTable sales={filteredSales} />
        </section>
      </main>
    </div>
  );
}