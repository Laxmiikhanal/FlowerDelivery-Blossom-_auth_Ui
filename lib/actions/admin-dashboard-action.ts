"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5051";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

export async function getAdminDashboard() {
  try {
    const headers = await getAuthHeaders();

    const [usersRes, productsRes, ordersRes] = await Promise.all([
      fetch(`${BACKEND_URL}/api/admin/users`, {
        method: "GET",
        headers,
        cache: "no-store",
      }),
      fetch(`${BACKEND_URL}/api/admin/products`, {
        method: "GET",
        headers,
        cache: "no-store",
      }),
      fetch(`${BACKEND_URL}/api/admin/orders`, {
        method: "GET",
        headers,
        cache: "no-store",
      }),
    ]);

    const [usersData, productsData, ordersData] = await Promise.all([
      usersRes.json(),
      productsRes.json(),
      ordersRes.json(),
    ]);

    const allUsers = usersData.data || [];
    const totalUsers = Array.isArray(allUsers)
      ? allUsers.filter((u: any) => u.role === "user").length
      : 0;

    const totalProducts = Array.isArray(productsData.data)
      ? productsData.data.length
      : 0;

    const allOrders = ordersData.data || [];
    const totalOrders = Array.isArray(allOrders) ? allOrders.length : 0;

    const totalRevenue = Array.isArray(allOrders)
      ? allOrders.reduce(
          (sum: number, order: any) => sum + (order.totalAmount || 0),
          0
        )
      : 0;

    const recentOrders = Array.isArray(allOrders)
      ? allOrders.slice(0, 5)
      : [];

    return {
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },
      recentOrders,
    };
  } catch (error) {
    console.error("Failed to fetch admin dashboard:", error);
    return { success: false, message: "Network error" };
  }
}

