const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("workzone_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `API Error: ${response.status}`);
  }

  return data;
}

export const api = {
  get: (endpoint) =>
    request(endpoint, {
      method: "GET"
    }),

  post: (endpoint, data) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(data)
    }),

  put: (endpoint, data) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  delete: (endpoint) =>
    request(endpoint, {
      method: "DELETE"
    })
};

export async function registerUser(data) {
  const result = await api.post("/auth/register", data);

  if (result.token) {
    localStorage.setItem("workzone_token", result.token);
  }

  return result;
}

export async function loginUser(data) {
  const result = await api.post("/auth/login", data);

  if (result.token) {
    localStorage.setItem("workzone_token", result.token);
  }

  return result;
}

export function logoutUser() {
  localStorage.removeItem("workzone_token");
}

export function isLoggedIn() {
  return Boolean(localStorage.getItem("workzone_token"));
}
