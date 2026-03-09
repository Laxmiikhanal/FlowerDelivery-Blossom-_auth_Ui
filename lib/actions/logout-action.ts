"use server";

import { cookies } from "next/headers";

export const logout = async () => {
    try {
        const cookieStore = await cookies();

        // ✅ Delete the exact cookie names we used during login
        cookieStore.delete('auth_token');
        cookieStore.delete('user_data');

        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false };
    }
};