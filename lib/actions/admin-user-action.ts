"use server";

import { getAuthToken } from "@/lib/cookie";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5051";

export async function handleAdminCreateUser(formData: FormData) {
  const token = await getAuthToken();

  if (!token) {
    return { success: false, message: "Unauthorized. Please login again." };
  }

  const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      success: false,
      message: json?.message || `Create user failed (${res.status})`,
    };
  }

  return json || { success: true, message: "User created" };
}
