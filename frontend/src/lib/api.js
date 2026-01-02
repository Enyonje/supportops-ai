import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "https://supportops-ai.onrender.com"
});

api.interceptors.request.use(config => {
  const tenantId = localStorage.getItem("tenantId");
  const token = localStorage.getItem("token");

  if (tenantId) config.headers["x-tenant-id"] = tenantId;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 429) {
      toast.error("AI limit reached. Upgrade required.");
    }
    return Promise.reject(err);
  }
);

export default api;
