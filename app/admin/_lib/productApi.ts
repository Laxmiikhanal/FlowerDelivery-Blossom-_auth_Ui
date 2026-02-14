// app/admin/_lib/productApi.ts
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
      ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data as T;
}

export type AdminProduct = {
  _id: string;
  name: string;
  price: number;
  category?: string;
  description?: string;
  imageUrl?: string;
  stock?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export async function fetchAdminProducts(opts?: { page?: number; limit?: number; q?: string }) {
  const page = opts?.page ?? 1;
  const limit = opts?.limit ?? 50;

  const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (opts?.q) qs.set("q", opts.q);

  return apiFetch<{
    success: boolean;
    data: AdminProduct[];
    meta?: any;
    message?: string;
  }>(`/api/admin/products?${qs.toString()}`);
}

export async function fetchAdminProductById(id: string) {
  return apiFetch<{ success: boolean; data: AdminProduct; message?: string }>(
    `/api/admin/products/${id}`
  );
}

export async function createAdminProduct(payload: Partial<AdminProduct>) {
  return apiFetch<{ success: boolean; data: AdminProduct; message?: string }>(
    `/api/admin/products`,
    { method: "POST", body: JSON.stringify(payload) }
  );
}

export async function updateAdminProduct(id: string, payload: Partial<AdminProduct>) {
  return apiFetch<{ success: boolean; data: AdminProduct; message?: string }>(
    `/api/admin/products/${id}`,
    { method: "PATCH", body: JSON.stringify(payload) }
  );
}

export async function deleteAdminProduct(id: string) {
  return apiFetch<{ success: boolean; message?: string }>(`/api/admin/products/${id}`, {
    method: "DELETE",
  });
}
