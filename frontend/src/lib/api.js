// frontend/src/lib/api.js
import axios from "axios";

/**
 * Base API instance
 * Render backend URL is injected via VITE_API_URL
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  withCredentials: true,
  timeout: 15000,
});

/**
 * REQUEST INTERCEPTOR
 * - Attach auth token
 * - Attach tenant id
 */
api.interceptors.request.use(
  (config) => {
    // 🔐 Auth token
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 🏢 Tenant support
    const tenantId = localStorage.getItem("tenant_id");
    if (tenantId) {
      config.headers["X-Tenant-ID"] = tenantId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 * - Handle auth errors globally
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      console.warn("Unauthorized — logging out");
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }

    if (status === 403) {
      console.warn("Forbidden — insufficient permissions");
    }

    return Promise.reject(error);
  }
);

export default api;
