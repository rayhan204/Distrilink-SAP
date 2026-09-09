import type { AuthUser } from "@/types";
import { AUTH_STORAGE_KEY } from "@/lib/constants";

export function setAuthUser(user: AuthUser) {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(user)
  );
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const data = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!data) {
    return null;
  }

  try {
    return JSON.parse(data) as AuthUser;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function removeAuthUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}