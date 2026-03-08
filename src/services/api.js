import axios from "axios";

const API = axios.create({
  baseURL: "https://suffescom-wallet-system-backend.onrender.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("wallet-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;