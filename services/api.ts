import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60 * 60 * 1000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined" && localStorage) {
      const accessToken = localStorage.getItem("access-token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// apiClient.interceptors.response.use(null, (error) => {
//   if (error.response.status === 401) {
//     localStorage.clear();
//     apiClient(error.config);
//   }
// });
//
export default apiClient;
