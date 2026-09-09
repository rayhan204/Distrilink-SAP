"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { removeAuthUser } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const router = useRouter();

  function handleLogout() {
    removeAuthUser();
    router.push(ROUTES.LOGIN);
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0d1b2a] text-white">
            <span className="font-black">D</span>
          </div>
          <div>
            <p className="text-base font-bold tracking-tight text-slate-950">DISTRILINK</p>
            <p className="text-[11px] font-medium text-slate-400">Sales Performance</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden border-r border-slate-200 pr-4 text-right sm:block">
            <p className="text-sm font-semibold text-slate-900">{userName}</p>
            <p className="text-xs text-slate-400">Sales Manager</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Keluar dari akun"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
