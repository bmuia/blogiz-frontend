const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  

const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

export {
  API_BASE_URL,
  getApiUrl
};
