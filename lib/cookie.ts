// "use server"

// import { cookies } from "next/headers"

// interface UserData {
//     _id: string;
//     email: string;
//     role: string;
//     createdAt: string;
//     updatedAt: string;
//     [key: string]: any;
// }
// export const setAuthToken = async (token: string) => {
//     const cookieStore = await cookies();
//     cookieStore.set({
//         name: 'auth_token',
//         value: token,
//     })
// }
// export const getAuthToken = async () => {
//     const cookieStore = await cookies();
//     return cookieStore.get('auth_token')?.value || null;
// }
// export const setUserData = async (userData: UserData) => {
//     const cookieStore = await cookies();
//     cookieStore.set({
//         name: 'user_data',
//         value: JSON.stringify(userData),
//     })
// }
// export const getUserData = async (): Promise<UserData | null> => {
//     const cookieStore = await cookies();
//     const userData = cookieStore.get('user_data')?.value || null;
//     return userData ? JSON.parse(userData) : null;
// }

// export const clearAuthCookies = async () => {
//     const cookieStore = await cookies();
//     cookieStore.delete('auth_token');
//     cookieStore.delete('user_data');
// }


"use server";

import { cookies } from "next/headers";

export const setAuthToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
};

export const setUserData = async (userData: any) => {
  const cookieStore = await cookies();
  cookieStore.set("user_data", JSON.stringify(userData), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });
};

export const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value || null;
};

export const getUserData = async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get("user_data")?.value || null;
  return raw ? JSON.parse(raw) : null;
};

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("user_data");
};
