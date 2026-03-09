"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5051";

export const updateProfile = async (data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const userDataCookie = cookieStore.get("userData")?.value;

        if (!token || !userDataCookie) {
            return { success: false, message: "Not authenticated" };
        }

        const userData = JSON.parse(userDataCookie);
        const userId = userData._id;

        const payload: any = {};
        if (data.firstName) payload.firstName = data.firstName;
        if (data.lastName) payload.lastName = data.lastName;
        if (data.email) payload.email = data.email.trim().toLowerCase();
        if (data.password) payload.password = data.password;

        const url = `${BACKEND_URL}/api/auth/${userId}`;

        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const json = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: json?.message || `Update failed (${res.status})`,
            };
        }

        // Update user data cookie
        if (json?.data) {
            cookieStore.set("userData", JSON.stringify(json.data), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7, // 7 days
            });
        }

        return { success: true, message: "Profile updated successfully", data: json.data };
    } catch (err: any) {
        console.error("UPDATE PROFILE ERROR:", err?.message || err);
        return { success: false, message: "Failed to update profile" };
    }
};
