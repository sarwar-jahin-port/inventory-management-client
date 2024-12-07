import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`, // Replace with your backend's base URL
  timeout: 10000, // Optional timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request/response interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization headers if needed
    // config.headers['Authorization'] = 'Bearer token';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
