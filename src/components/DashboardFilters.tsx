import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";

interface DashboardFiltersProps {
  search: string;
  area: string;
  areas: string[];
  onSearchChange: (value: string) => void;
  onAreaChange: (value: string) => void;
  onReset: () => void;
}

export function DashboardFilters({
  search,
  area,
  areas,
  onSearchChange,
  onAreaChange,
  onReset,
}: DashboardFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_-24px_rgba(15,23,42,0.5)]">
      
      {/* HEADER */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-600">
            <SlidersHorizontal size={15} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Filter Data</h2>
            <p className="hidden text-[11px] text-slate-400 sm:block">
              Cari salesman atau filter berdasarkan area.
            </p>
          </div>
        </div>

        {(search || area) && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-50 px-2.5 py-2 text-xs font-semibold text-sky-600 transition hover:bg-sky-100"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        )}
      </div>

      {/* FILTERS */}
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
        
        {/* Search */}
        <div>
          <label htmlFor="search" className="mb-1.5 block text-[11px] font-bold text-slate-600">
            Cari Salesman
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Ketik nama salesman..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
            />
          </div>
        </div>

        {/* Area */}
        <div>
          <label htmlFor="area" className="mb-1.5 block text-[11px] font-bold text-slate-600">
            Area
          </label>
          <select
            id="area"
            value={area}
            onChange={(e) => onAreaChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
          >
            <option value="">Semua Area</option>
            {areas.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}