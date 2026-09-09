import { NextResponse } from "next/server";

const LOGIN_URL = "https://dummyjson.com/auth/login";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const username = body?.username?.trim();
    const password = body?.password;

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username dan password wajib diisi." },
        { status: 400 }
      );
    }

    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            data?.message || "Username atau password salah.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Login API error:", error);

    return NextResponse.json(
      {
        message: "Gagal menghubungi server login.",
      },
      { status: 500 }
    );
  }
}