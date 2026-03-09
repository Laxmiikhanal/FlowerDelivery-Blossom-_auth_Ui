"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5051";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getAdminCategories() {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BACKEND_URL}/api/admin/categories`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return { success: false, message: "Network error" };
  }
}

export async function createAdminCategory(payload: {
  name: string;
  description?: string;
}) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BACKEND_URL}/api/admin/categories`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    console.error("Failed to create category:", error);
    return { success: false, message: "Network error" };
  }
}

export async function deleteAdminCategory(id: string) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BACKEND_URL}/api/admin/categories/${id}`, {
      method: "DELETE",
      headers,
    });
    return await res.json();
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { success: false, message: "Network error" };
  }
}

