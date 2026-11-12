// Standalone SupportOps API client. No Nexus Core frontend dependencies.
const API_BASE_URL = (
  import.meta.env.VITE_SUPPORTOPS_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "https://supportops-ai.onrender.com"
).replace(/\/api\/?$/, "").replace(/\/$/, "");

const TOKEN_KEYS = ["supportops_token", "authToken", "token", "access_token"];
const readToken = () => {
  if (typeof window === "undefined") return null;
  for (const key of TOKEN_KEYS) {
    const value = window.localStorage.getItem(key);
    if (value) return value;
  }
  return null;
};

export const isAbortError = (error) =>
  error?.name === "AbortError" || error?.name === "CanceledError" || error?.code === "ERR_CANCELED";

export async function api(url, options = {}) {
  const target = /^https?:\/\//i.test(url) ? url : `${API_BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
  const token = readToken();
  const org = typeof window !== "undefined" ? localStorage.getItem("activeOrgId") || localStorage.getItem("orgId") : null;
  const response = await fetch(target, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body && typeof options.body === "string" ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(org ? { "X-Org-Id": org } : {}),
      "X-App-Slug": "supportops",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = null; }
  if (!response.ok) {
    throw Object.assign(new Error(data?.message || data?.error || `Request failed (${response.status})`), { status: response.status });
  }
  return data;
}

const legacy = {};
for (const method of ["get", "post", "put", "patch", "delete"]) {
  legacy[method] = async (url, bodyOrConfig, maybeConfig = {}) => {
    const read = method === "get" || method === "delete";
    const config = read ? (bodyOrConfig || {}) : (maybeConfig || {});
    const body = read ? undefined : bodyOrConfig;
    const result = await api(url, { method: method.toUpperCase(), ...config, ...(body !== undefined ? { body: JSON.stringify(body) } : {}) });
    return { data: result };
  };
}
export default legacy;
export const apiFetch = api;
