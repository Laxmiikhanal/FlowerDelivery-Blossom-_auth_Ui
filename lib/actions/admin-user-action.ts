"use server";

import { getAuthToken } from "@/lib/cookie";

const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:5051";

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function withTimeout(ms: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { controller, timer };
}

export async function handleAdminCreateUser(formData: FormData) {
  const token = await getAuthToken();

  if (!token) {
    return { success: false, message: "Unauthorized. Please login again." };
  }

  const { controller, timer } = withTimeout(8000);

  try {
    const url = `${BACKEND_URL}/api/auth/user`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // ✅ DO NOT set Content-Type for FormData
      },
      body: formData,
      cache: "no-store",
      signal: controller.signal,
    });

    const json = await safeJson(res);

    if (!res.ok) {
      return {
        success: false,
        message: json?.message || `Create user failed (${res.status})`,
      };
    }

    // ✅ normalize response
    return {
      success: json?.success ?? true,
      message: json?.message || "User created",
      data: json?.data ?? json,
    };
  } catch (err: any) {
    return { success: false, message: "Backend not reachable / timeout" };
  } finally {
    clearTimeout(timer);
  }
}
