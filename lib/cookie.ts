"use server";

import { cookies } from "next/headers";

interface UserData {
  _id: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export const setAuthToken = async (token: string) => {
  const cookieStore = cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
};

export const getAuthToken = async () => {
  const cookieStore = cookies();
  return cookieStore.get("auth_token")?.value || null;
};

export const setUserData = async (userData: UserData) => {
  const cookieStore = cookies();
  cookieStore.set("user_data", JSON.stringify(userData), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });
};

export const getUserData = async (): Promise<UserData | null> => {
  const cookieStore = cookies();
  const raw = cookieStore.get("user_data")?.value || null;
  return raw ? JSON.parse(raw) : null;
};

export const clearAuthCookies = async () => {
  const cookieStore = cookies();

  // ✅ value argument REQUIRED
  cookieStore.set("auth_token", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  // ✅ value argument REQUIRED
  cookieStore.set("user_data", "", {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
};
