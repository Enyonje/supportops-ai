import axios from "axios";

/**
 * 🔐 Resolve backend API URL
 * MUST be defined in Vercel as VITE_API_URL
 */
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "❌ VITE_API_URL is not defined. Set it in your Vercel Environment Variables."
  );
}

/**
 * Base Axios instance
 */
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // needed for cookies if you add refresh tokens later
  timeout: 15000,
});

/**
 * ============================
 * REQUEST INTERCEPTOR
 * ============================
 * - Attach JWT
 * - Attach Tenant ID
 */
api.interceptors.request.use(
  (config) => {
    // 🔐 Attach JWT
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 🏢 Attach tenant context
    const tenantId = localStorage.getItem("tenant_id");
    if (tenantId) {
      config.headers["X-Tenant-ID"] = tenantId;
    }

    // 🧠 Dev visibility
    if (import.meta.env.DEV) {
      console.debug("[API REQUEST]", config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ============================
 * RESPONSE INTERCEPTOR
 * ============================
 * - Global auth handling
 * - Safe redirects
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // 🔐 Unauthorized → logout once
    if (status === 401) {
      console.warn("🔒 Unauthorized — clearing session");

      localStorage.removeItem("access_token");
      localStorage.removeItem("tenant_id");

      // Prevent redirect loop
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // 🚫 Forbidden
    if (status === 403) {
      console.warn("🚫 Forbidden — insufficient permissions");
    }

    // 🌐 Backend down / timeout
    if (!error.response) {
      console.error("🌐 Network / backend error", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
