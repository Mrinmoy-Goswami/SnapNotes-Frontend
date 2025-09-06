// useApiClient.ts
import axios, { type AxiosInstance } from "axios";
import { useMemo } from "react";
import { useAuth } from "react-oidc-context";


export const useApiClient = (): AxiosInstance => {
 const user = useAuth()

  const apiClient = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
    });

    // Request interceptor
    instance.interceptors.request.use(
      (config) => {
        if (user?.user?.id_token) {
          config.headers.Authorization = user.user.id_token; 
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Optional: Response interceptor for global 401 handling
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.warn("Unauthorized ");
          // e.g. trigger oidc logout or token refresh
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [user]); // Recreate client if token changes

  return apiClient;
};
