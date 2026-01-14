import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,   // e.g. "https://supportops-ai.onrender.com/api/v1"
  withCredentials: true,
});

// ✅ Attach JWT token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle 401 errors globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");   // clear stored user too
      window.location.href = "/login";   // redirect to login
    }
    return Promise.reject(err);
  }
);

export default api;