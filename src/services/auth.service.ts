import type { AuthUser, LoginPayload } from "@/types";

interface ApiErrorBody { message?: string }

export class AuthServiceError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "AuthServiceError";
  }
}

export async function login(payload: LoginPayload): Promise<AuthUser> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => ({}))) as Partial<AuthUser> & ApiErrorBody;

    if (!response.ok) {
      throw new AuthServiceError(
        data.message || (response.status >= 500
          ? "Layanan login sedang bermasalah. Silakan coba lagi."
          : "Username atau password tidak valid."),
        response.status,
      );
    }

    if (!data.id || !data.username || !data.firstName || !data.accessToken) {
      throw new AuthServiceError("Respons login tidak lengkap. Silakan coba lagi.");
    }

    return {
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName ?? "",
      accessToken: data.accessToken,
    };
  } catch (error) {
    if (error instanceof AuthServiceError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new AuthServiceError("Koneksi login terlalu lama. Periksa koneksi lalu coba lagi.");
    }
    throw new AuthServiceError("Tidak dapat terhubung ke layanan login. Silakan coba lagi.");
  } finally {
    window.clearTimeout(timeoutId);
  }
}
