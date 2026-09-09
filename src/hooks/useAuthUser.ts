"use client";

import { useEffect, useState } from "react";
import { getAuthUser } from "@/lib/auth";
import type { AuthUser } from "@/types";

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getAuthUser());
    setLoading(false);
  }, []);

  return { user, loading };
}