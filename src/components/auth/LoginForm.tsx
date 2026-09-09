"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { ArrowRight, Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginService } from "@/services/auth.service";
import { setAuthUser } from "@/lib/auth";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await loginService({ username, password });
      setAuthUser(user);
      router.push("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-[#0d1b2a] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full border border-white/10" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <Image
                src="/images/image.png"
                alt="DISTRILINK"
                width={180}
                height={48}
                priority
                className="h-auto w-45"
            />
            <div>
                <p className="text-lg font-bold tracking-tight text-slate-900">DISTRILINK</p>
                <p className="text-xs text-slate-500">Sales Force Dashboard</p>
            </div>
            </div>
        </div>
        <div className="relative max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
            Sales Performance
          </p>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
            Satu dashboard untuk melihat performa tim sales dengan lebih jelas.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-slate-300">
            Pantau kunjungan, efektivitas visit, dan nilai order dalam satu tampilan yang ringkas dan mudah dipindai.
          </p>
        </div>

        <p className="relative text-xs text-slate-400">Internal performance monitoring</p>
      </section>

      <section className="flex items-center justify-center bg-[#f4f7fb] px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <Image
                src="/images/image.png"
                alt="DISTRILINK"
                width={180}
                height={48}
                priority
                className="h-auto w-45"
            />
              <div>
                <p className="font-bold text-slate-900">DISTRILINK</p>
                <p className="text-xs text-slate-500">Sales Automation Platform</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_50px_-30px_rgba(15,23,42,0.35)] sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-semibold text-sky-600">Selamat datang</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                Masuk ke Dashboard
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Gunakan akun Anda untuk melihat analisa performa salesman.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-semibold text-slate-700">
                  Username
                </label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Masukkan username"
                    autoComplete="username"
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 disabled:bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 disabled:bg-slate-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d1b2a] px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#172a3d] focus:outline-none focus:ring-4 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Memproses..." : "Masuk"}
                {!loading && <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />}
              </button>
            </form>

            <div className="mt-7 border-t border-slate-100 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Akun demo</p>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
                <span><b className="text-slate-800">Username:</b> emilys</span>
                <span><b className="text-slate-800">Password:</b> emilyspass</span>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-slate-400">
            DISTRILINK · Sales Performance Dashboard
          </p>
        </div>
      </section>
    </div>
  );
}
