import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  
});

// TODO / change temp token to access token when successful testing api
// apiClient.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//         const accessToken = sessionService.loggedInUser?.token;
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         } else {
//             globalRouter.navigate.push("/auth/login");
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

export default apiClient;