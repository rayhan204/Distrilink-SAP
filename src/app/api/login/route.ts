import { NextResponse } from "next/server";
import type { LoginPayload } from "@/types";

const LOGIN_URL = "https://dummyjson.com/auth/login";
const REQUEST_TIMEOUT_MS = 10_000;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LoginPayload>;
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");

    if (!username || !password) {
      return NextResponse.json({ message: "Username dan password wajib diisi." }, { status: 400 });
    }

    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    const data = await response.json().catch(() => ({ message: "Respons layanan login tidak valid." }));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    const isTimeout = error instanceof DOMException && error.name === "TimeoutError";
    return NextResponse.json(
      { message: isTimeout ? "Layanan login tidak merespons tepat waktu." : "Server login sedang bermasalah. Silakan coba lagi." },
      { status: 502 },
    );
  }
}
