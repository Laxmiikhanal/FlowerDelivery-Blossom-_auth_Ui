// "use server";

// import { RegisterData, LoginData } from "@/app/(auth)/schema";
// import { setAuthToken, setUserData } from "@/lib/cookie";

// const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:5051";

// async function safeJson(res: Response) {
//   try {
//     return await res.json();
//   } catch {
//     return null;
//   }
// }

// function withTimeout(ms: number) {
//   const controller = new AbortController();
//   const timer = setTimeout(() => controller.abort(), ms);
//   return { controller, timer };
// }

// export const handleRegister = async (data: RegisterData) => {
//   console.log("handleRegister called");
//   console.log("BACKEND_URL =", BACKEND_URL);

//   const { controller, timer } = withTimeout(8000);

//   try {
//     const { confirmPassword, ...rest } = data;

//     const payload = {
//       ...rest,
//       email: (data.email || "").trim().toLowerCase(),
//     };

//     const url = `${BACKEND_URL}/api/auth/register`;
//     console.log("REGISTER ->", url);

//     const res = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//       cache: "no-store",
//       signal: controller.signal,
//     });

//     const json = await safeJson(res);

//     if (!res.ok) {
//       return {
//         success: false,
//         message: json?.message || `Register failed (${res.status})`,
//       };
//     }

//     return { success: true, message: "Registered successfully. Please login." };
//   } catch (err: any) {
//     console.error("REGISTER FETCH ERROR:", err?.message || err);
//     return { success: false, message: "Backend not reachable / timeout" };
//   } finally {
//     clearTimeout(timer);
//   }
// };

// export const handleLogin = async (data: LoginData) => {
//   console.log("handleLogin called");
//   console.log("BACKEND_URL =", BACKEND_URL);

//   const { controller, timer } = withTimeout(8000);

//   try {
//     const payload = {
//       ...data,
//       email: (data.email || "").trim().toLowerCase(),
//     };

//     const url = `${BACKEND_URL}/api/auth/login`;
//     console.log("LOGIN ->", url);

//     const res = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//       cache: "no-store",
//       signal: controller.signal,
//     });

//     const json = await safeJson(res);

//     if (!res.ok) {
//       return {
//         success: false,
//         message: json?.message || `Login failed (${res.status})`,
//       };
//     }

//     if (json?.success && json?.token) {
//       await setAuthToken(json.token);
//       await setUserData(json.data);
//       return { success: true, message: "Login successful", data: json.data };
//     }

//     return { success: false, message: json?.message || "Login failed" };
//   } catch (err: any) {
//     console.error("LOGIN FETCH ERROR:", err?.message || err);
//     return { success: false, message: "Backend not reachable / timeout" };
//   } finally {
//     clearTimeout(timer);
//   }
// };


"use server";

import { RegisterData, LoginData } from "@/app/(auth)/schema";
import { setAuthToken, setUserData } from "@/lib/cookie";

const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:5051";

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function withTimeout(ms: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { controller, timer };
}

export const handleRegister = async (data: RegisterData) => {
  const { controller, timer } = withTimeout(8000);

  try {
    const { confirmPassword, ...rest } = data;

    const payload = {
      ...rest,
      email: (data.email || "").trim().toLowerCase(),
    };

    const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });

    const json = await safeJson(res);

    if (!res.ok) {
      return {
        success: false,
        message: json?.message || `Register failed (${res.status})`,
      };
    }

    return { success: true, message: "Registered successfully. Please login." };
  } catch (err: any) {
    return { success: false, message: "Backend not reachable / timeout" };
  } finally {
    clearTimeout(timer);
  }
};

export const handleLogin = async (data: LoginData) => {
  const { controller, timer } = withTimeout(8000);

  try {
    const payload = {
      ...data,
      email: (data.email || "").trim().toLowerCase(),
    };

    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });

    const json = await safeJson(res);

    if (!res.ok) {
      return {
        success: false,
        message: json?.message || `Login failed (${res.status})`,
      };
    }

    // ✅ expect { success, token, data }
    const token = json?.token;
    const user = json?.data;

    if (json?.success && token && user?._id) {
      // ✅ set server-side cookies
      await setAuthToken(token);
      await setUserData(user);

      // ✅ return shape your LoginForm expects
      return {
        success: true,
        message: "Login successful",
        data: { ...user, token }, // token now exists at result.data.token ✅
      };
    }

    return { success: false, message: json?.message || "Login failed" };
  } catch (err: any) {
    return { success: false, message: "Backend not reachable / timeout" };
  } finally {
    clearTimeout(timer);
  }
};
