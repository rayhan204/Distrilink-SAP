"use client";

import { useMemo, useSyncExternalStore } from "react";
import { AUTH_STORAGE_KEY } from "@/lib/constants";
import type { AuthUser } from "@/types";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return window.localStorage.getItem(AUTH_STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

export function useAuthUser() {
  const storedUser = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const user = useMemo<AuthUser | null>(() => {
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser) as AuthUser;
    } catch {
      return null;
    }
  }, [storedUser]);

  return { user, isCheckingAuth: storedUser === null && typeof window === "undefined" };
}
