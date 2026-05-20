const API_BASE = import.meta.env.VITE_API_URL ?? '';
const USER_KEY = 'krishi_user';
const TOKEN_KEY = 'krishi_token';

async function request(path, options = {}) {
  const token = getToken();
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.details || `Request failed (${response.status})`);
  }

  return data;
}

export const api = {
  health: () => request('/health'),

  signup: (body) =>
    request('/api/auth/signup', { method: 'POST', body: JSON.stringify(body) }),

  login: (body) =>
    request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),

  session: () => request('/api/auth/session'),

  registerFarmer: (body) =>
    request('/api/farmers', { method: 'POST', body: JSON.stringify(body) }),

  getFarmers: () => request('/api/farmers'),

  postRequirement: (body) =>
    request('/api/company/requirements', { method: 'POST', body: JSON.stringify(body) }),

  getRequirements: () => request('/api/company/requirements'),

  getMatches: (requirementId) => request(`/api/matches/requirements/${requirementId}`),

  getAllMatches: () => request('/api/matches/all'),

  aiConsult: (message, profile) =>
    request('/api/ai/consult', {
      method: 'POST',
      body: JSON.stringify({ message, profile }),
    }),

  diagnoseDisease: (body) =>
    request('/api/ai/disease-diagnosis', { method: 'POST', body: JSON.stringify(body) }),

  predictDemand: (body) =>
    request('/api/ai/demand-prediction', { method: 'POST', body: JSON.stringify(body) }),

  getFarmerDashboard: () => request('/api/dashboard/farmer'),

  getCompanyDashboard: () => request('/api/dashboard/company'),

  getSchemes: (params) => {
    const query = new URLSearchParams(params).toString();
    return request(`/api/ai/schemes?${query}`);
  },
};

export function saveUser(user, token) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function saveDemoUser(role = 'farmer') {
  const names = {
    farmer: 'Ramesh Patil',
    company: 'Priya Sharma',
    fpo: 'Asha Collective',
    admin: 'Platform Admin',
  };
  const user = {
    id: `demo-${role}`,
    email: `${role}@demo.krishi`,
    full_name: names[role] ?? 'Demo User',
    role,
  };
  saveUser(user);
  return user;
}
