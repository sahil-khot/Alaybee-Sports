// API client utility for Alaybee Sports Backend

const API_BASE = "/api";

export const getAuthToken = () => {
  return localStorage.getItem("alaybee_token");
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("alaybee_token", token);
  } else {
    localStorage.removeItem("alaybee_token");
  }
};

const request = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  } catch (err) {
    console.error(`API Error [${endpoint}]:`, err.message);
    throw err;
  }
};

export const api = {
  // Auth endpoints
  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (userData) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  getMe: () => request("/auth/me"),

  updateProfile: (profileData) =>
    request("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),

  getDemoAccounts: () => request("/auth/demo-accounts"),

  getAthletePerks: () => request("/auth/athlete-perks"),
};

export default api;
