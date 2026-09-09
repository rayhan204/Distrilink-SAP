import { Search, SlidersHorizontal } from "lucide-react";

interface DashboardFiltersProps {
  search: string;
  area: string;
  areas: string[];
  onSearchChange: (value: string) => void;
  onAreaChange: (value: string) => void;
}

export function DashboardFilters({
  search,
  area,
  areas,
  onSearchChange,
  onAreaChange,
}: DashboardFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_-24px_rgba(15,23,42,0.5)] sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-600">
          <SlidersHorizontal size={16} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Filter Data</h2>
          <p className="text-xs text-slate-400">Persempit data berdasarkan salesman atau area.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <div>
          <label htmlFor="search" className="mb-2 block text-xs font-semibold text-slate-600">
            Cari Salesman
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              id="search"
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Ketik nama salesman..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
            />
          </div>
        </div>

        <div>
          <label htmlFor="area" className="mb-2 block text-xs font-semibold text-slate-600">
            Area
          </label>
          <select
            id="area"
            value={area}
            onChange={(event) => onAreaChange(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
          >
            <option value="">Semua Area</option>
            {areas.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
