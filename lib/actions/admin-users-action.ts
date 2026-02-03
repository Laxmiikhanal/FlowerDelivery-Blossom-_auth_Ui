"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:5051";

async function getAuthHeaders() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getAdminUsers() {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
            method: "GET",
            headers,
            cache: "no-store",
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return { success: false, message: "Network error" };
    }
}

export async function createAdminUser(userData: any) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
            method: "POST",
            headers,
            body: JSON.stringify(userData),
        });
        return await res.json();
    } catch (error) {
        return { success: false, message: "Network error" };
    }
}

export async function updateAdminUser(id: string, userData: any) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${BACKEND_URL}/api/admin/users/${id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(userData),
        });
        return await res.json();
    } catch (error) {
        return { success: false, message: "Network error" };
    }
}

export async function deleteAdminUser(id: string) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${BACKEND_URL}/api/admin/users/${id}`, {
            method: "DELETE",
            headers,
        });
        return await res.json();
    } catch (error) {
        return { success: false, message: "Network error" };
    }
}
