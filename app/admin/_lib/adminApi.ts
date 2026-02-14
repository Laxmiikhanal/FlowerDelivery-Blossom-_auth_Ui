export type AdminUser = {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: "user" | "admin";
};

export type AdminProduct = {
  _id: string;
  name: string;
  price: number;
  description?: string;
  categoryId?: string | null;
  imageUrl?: string;
  stock?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type AdminOrderItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  imageUrl?: string;
};

export type AdminOrder = {
  _id: string;
  userId:
    | string
    | {
        _id: string;
        firstName?: string;
        lastName?: string;
        email: string;
      };
  items: AdminOrderItem[];
  total: number;
  status: OrderStatus;
  address?: string;
  phone?: string;
  notes?: string;
  cancelReason?: string;
  createdAt?: string;
  updatedAt?: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5051";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const isFormData =
    typeof FormData !== "undefined" && init?.body instanceof FormData;

  // ✅ IMPORTANT: don’t force JSON content-type for FormData
  const headers: Record<string, string> = {
    ...(init?.headers as any),
  };

  if (!isFormData) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${url}`, {
    ...init,
    headers,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data as T;
}

function extractList(payload: any): any[] {
  const list =
    payload?.data?.items ||
    payload?.data?.users ||
    payload?.data?.products ||
    payload?.data?.orders ||
    payload?.data ||
    payload?.items ||
    payload?.users ||
    payload?.products ||
    payload?.orders ||
    (Array.isArray(payload) ? payload : []);
  return Array.isArray(list) ? list : [];
}

/* =========================
   USERS
========================= */
export async function listUsers(page = 1, limit = 100) {
  const payload = await apiFetch<any>(`/api/admin/users?page=${page}&limit=${limit}`);
  return { users: extractList(payload) as AdminUser[], raw: payload };
}

export async function getUserById(id: string) {
  const payload = await apiFetch<any>(`/api/admin/users/${id}`);
  return (payload?.data || payload?.user || payload) as AdminUser;
}

export async function createUser(body: Partial<AdminUser> & { password: string }) {
  return apiFetch<any>(`/api/admin/users`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateUser(id: string, body: Partial<AdminUser> & { password?: string }) {
  return apiFetch<any>(`/api/admin/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function deleteUser(id: string) {
  return apiFetch<any>(`/api/admin/users/${id}`, { method: "DELETE" });
}

/* =========================
   PRODUCTS (multer => FormData)
========================= */
export async function listProducts(page = 1, limit = 50) {
  const payload = await apiFetch<any>(`/api/admin/products?page=${page}&limit=${limit}`);
  return { products: extractList(payload) as AdminProduct[], raw: payload };
}

export async function getProductById(id: string) {
  const payload = await apiFetch<any>(`/api/admin/products/${id}`);
  return (payload?.data || payload?.product || payload) as AdminProduct;
}

export async function createProduct(
  body: {
    name: string;
    price: number;
    description?: string;
    categoryId?: string | null;
    stock?: number;
    isActive?: boolean;
  },
  imageFile?: File
) {
  const fd = new FormData();
  fd.append("name", body.name);
  fd.append("price", String(body.price));
  if (body.description) fd.append("description", body.description);
  if (body.categoryId != null) fd.append("categoryId", String(body.categoryId));
  if (body.stock != null) fd.append("stock", String(body.stock));
  if (body.isActive != null) fd.append("isActive", String(body.isActive));
  if (imageFile) fd.append("image", imageFile);

  return apiFetch<any>(`/api/admin/products`, {
    method: "POST",
    body: fd,
  });
}

export async function updateProduct(
  id: string,
  body: Partial<{
    name: string;
    price: number;
    description: string;
    categoryId: string | null;
    stock: number;
    isActive: boolean;
  }>,
  imageFile?: File
) {
  const fd = new FormData();
  if (body.name != null) fd.append("name", body.name);
  if (body.price != null) fd.append("price", String(body.price));
  if (body.description != null) fd.append("description", body.description);
  if (body.categoryId != null) fd.append("categoryId", String(body.categoryId));
  if (body.stock != null) fd.append("stock", String(body.stock));
  if (body.isActive != null) fd.append("isActive", String(body.isActive));
  if (imageFile) fd.append("image", imageFile);

  return apiFetch<any>(`/api/admin/products/${id}`, {
    method: "PUT",
    body: fd,
  });
}

export async function deleteProduct(id: string) {
  return apiFetch<any>(`/api/admin/products/${id}`, { method: "DELETE" });
}

/* =========================
   ORDERS
========================= */
export async function listOrders(page = 1, limit = 50, status?: OrderStatus) {
  const qs = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(status ? { status } : {}),
  });

  const payload = await apiFetch<any>(`/api/admin/orders?${qs.toString()}`);
  return { orders: extractList(payload) as AdminOrder[], raw: payload };
}

export async function getOrderById(id: string) {
  const payload = await apiFetch<any>(`/api/admin/orders/${id}`);
  return (payload?.data || payload?.order || payload) as AdminOrder;
}

export async function updateOrderStatus(
  id: string,
  body: { status: OrderStatus; note?: string; cancelReason?: string }
) {
  return apiFetch<any>(`/api/admin/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}
