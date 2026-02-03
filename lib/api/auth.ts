"use client";

import axios from "./axios";
import { API } from "./endpoints";
import { LoginData, RegisterData } from "@/app/(auth)/schema";

export async function register(data: RegisterData) {
  try {
    const response = await axios.post(API.AUTH.REGISTER, data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Registration failed",
      status: error?.response?.status,
    };
  }
}

export async function login(data: LoginData) {
  try {
    const response = await axios.post(API.AUTH.LOGIN, data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Login failed",
      status: error?.response?.status,
    };
  }
}
