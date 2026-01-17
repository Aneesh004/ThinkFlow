import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "http://localhost:8000";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const isPublicRoute = config.url.includes("/api/user/register/") || config.url.includes("/api/token/");

    if (token && !isPublicRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;