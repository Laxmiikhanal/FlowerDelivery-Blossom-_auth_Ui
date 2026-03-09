"use server";

import { setAuthToken, setUserData } from "@/lib/cookie";

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5051/api";

// ---------- Helpers ----------
async function readJsonSafe(res: Response): Promise<any> {
  const text = await res.text();

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (e) {
    // Backend returned HTML/plain text or broken JSON
    return { __invalidJson: true, __raw: text };
  }
}

function normalizeEmail(email: string) {
  return (email || "").trim().toLowerCase();
}

// ---------- Login ----------
export const handleLogin = async (data: LoginData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: normalizeEmail(data.email),
        password: data.password,
      }),
      cache: "no-store",
      credentials: "include", // IMPORTANT if backend sets cookies
    });

    const json = await readJsonSafe(res);

    // If backend did not return JSON
    if (json?.__invalidJson) {
      console.error("[handleLogin] Invalid JSON from backend:", json.__raw);
      return {
        success: false,
        message: "Backend returned an invalid response. Check backend logs.",
      };
    }

    if (!res.ok) {
      return {
        success: false,
        message: json?.message || "Login failed",
      };
    }

    // Accept multiple possible response shapes
    const token =
      json?.token ||
      json?.accessToken ||
      json?.data?.token ||
      json?.data?.accessToken ||
      null;

    const user =
      json?.user ||
      json?.data?.user ||
      (json?.data && typeof json.data === "object" ? json.data : null) ||
      null;

    // Many backends use cookie auth (token not in JSON) — user must still exist
    if (!user) {
      return {
        success: false,
        message: "Login succeeded but user data is missing from response.",
      };
    }

    // Store cookies in Next.js (only store token if provided)
    if (token) await setAuthToken(token);
    await setUserData(user);

    return { success: true, user, token };
  } catch (err: any) {
    console.error("[handleLogin] Error:", err?.message || err);
    return {
      success: false,
      message: "Network error: could not reach the backend.",
    };
  }
};

// ---------- Register ----------
export const handleRegister = async (data: RegisterData) => {
  try {
    const { confirmPassword, ...rest } = data;

    // Optional: basic client-side validation
    if (data.password !== confirmPassword) {
      return { success: false, message: "Passwords do not match." };
    }

    const payload = {
      ...rest,
      email: normalizeEmail(data.email),
    };

    const res = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      credentials: "include",
    });

    const json = await readJsonSafe(res);

    if (json?.__invalidJson) {
      console.error("[handleRegister] Invalid JSON from backend:", json.__raw);
      return {
        success: false,
        message: "Backend returned an invalid response. Check backend logs.",
      };
    }

    if (!res.ok) {
      return {
        success: false,
        message: json?.message || "Register failed",
      };
    }

    return {
      success: true,
      message: json?.message || "Registered successfully. Please login.",
    };
  } catch (err: any) {
    console.error("[handleRegister] Error:", err?.message || err);
    return {
      success: false,
      message: "Network error: could not reach the backend.",
    };
  }
};