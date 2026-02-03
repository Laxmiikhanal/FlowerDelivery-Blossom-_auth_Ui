"use server";

import { cookies } from "next/headers";

export const getCurrentUser = async () => {
    try {
        const cookieStore = await cookies();
        const userDataCookie = cookieStore.get("user_data")?.value;

        if (!userDataCookie) {
            return null;
        }

        return JSON.parse(userDataCookie);
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
};
