import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour les erreurs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ Erreur API:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
