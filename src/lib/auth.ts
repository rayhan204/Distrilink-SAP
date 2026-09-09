import type { AuthUser } from "@/types";
import { AUTH_STORAGE_KEY } from "./constants";

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function setAuthUser(user: AuthUser): void {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(user)
  );
}

export function removeAuthUser(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}