import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60 * 60,
});

// apiClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     if (localStorage) {
//       const accessToken = localStorage.getItem("access-token");
//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       }
//     }
//
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );
//
export default apiClient;
