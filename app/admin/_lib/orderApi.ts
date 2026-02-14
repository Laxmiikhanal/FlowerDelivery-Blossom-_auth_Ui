// app/admin/_lib/orderApi.ts
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5051";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("blossom_token")
  );
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data as T;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type AdminOrder = {
  _id: string;
  userId?: { firstName?: string; lastName?: string; email?: string } | string;
  items: { name: string; qty: number; price: number; imageUrl?: string }[];
  total: number;
  status: OrderStatus;
  address?: string;
  phone?: string;
  notes?: string;
  cancelReason?: string;
  cancelledAt?: string | null;
  statusHistory?: { status: OrderStatus; at: string; note?: string }[];
  createdAt: string;
  updatedAt: string;
};

export async function fetchAdminOrders(opts?: {
  page?: number;
  limit?: number;
  status?: OrderStatus | "";
}) {
  const page = opts?.page ?? 1;
  const limit = opts?.limit ?? 20;

  const qs = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (opts?.status) qs.set("status", opts.status);

  // backend returns: { success, data, meta, message }
  return apiFetch<{
    success: boolean;
    data: AdminOrder[];
    meta: { page: number; limit: number; total: number; totalPages: number };
    message: string;
  }>(`/api/admin/orders?${qs.toString()}`);
}

export async function fetchAdminOrderById(id: string) {
  return apiFetch<{
    success: boolean;
    data: AdminOrder;
    message: string;
  }>(`/api/admin/orders/${id}`);
}

export async function updateAdminOrderStatus(
  id: string,
  payload: { status: OrderStatus; note?: string; cancelReason?: string }
) {
  return apiFetch<{
    success: boolean;
    data: AdminOrder;
    message: string;
  }>(`/api/admin/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
