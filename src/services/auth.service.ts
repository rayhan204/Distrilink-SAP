import type {
  AuthUser,
  LoginPayload,
} from "../types/auth";

const LOGIN_URL = "https://dummyjson.com/auth/login";

export async function loginService(
  payload: LoginPayload
): Promise<AuthUser> {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Username atau password tidak valid."
    );
  }

  return data;
}