"use server";

import { cookies } from "next/headers";

export const logout = async () => {
    try {
        const cookieStore = await cookies();

        // Delete all auth-related cookies
        cookieStore.delete('token');
        cookieStore.delete('userData');

        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false };
    }
};
