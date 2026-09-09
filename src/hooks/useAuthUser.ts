"use client";

import { useSyncExternalStore } from "react";
import { getAuthUser } from "@/lib/auth";
import type { AuthUser } from "@/types";

// Auth session tidak "berubah" dari luar selama komponen hidup (tidak ada
// event listener storage di sini), jadi subscribe cukup no-op. Server tidak
// punya localStorage, sehingga snapshot server dan client harus berbeda agar
// React tahu perlu re-render sekali setelah hydration selesai — inilah yang
// dilakukan useSyncExternalStore secara aman tanpa perlu setState di useEffect.
function subscribe() {
  return () => {};
}

function getIsMountedOnClient() {
  return true;
}

function getIsMountedOnServer() {
  return false;
}

interface UseAuthUserResult {
  user: AuthUser | null;
  loading: boolean;
}

export function useAuthUser(): UseAuthUserResult {
  // false saat SSR/hydration awal, otomatis menjadi true setelah hydration
  // selesai (React yang menjadwalkan ulang render-nya, bukan kita).
  const hasMounted = useSyncExternalStore(
    subscribe,
    getIsMountedOnClient,
    getIsMountedOnServer
  );

  const user = hasMounted ? getAuthUser() : null;

  return { user, loading: !hasMounted };
}