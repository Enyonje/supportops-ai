import axios from "axios";

const api = axios.create({
  API_BASE_URL: "https://supportops-ai.onrender.com/api/v1",
  withCredentials: true,
  timeout: 15000,
});

// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global auth error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
