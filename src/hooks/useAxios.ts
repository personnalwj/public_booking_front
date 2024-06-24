import axios, { AxiosInstance } from "axios";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const apiClient: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_DOMAIN}`, // Replace with your base URL
  timeout: 5000, // Set your desired timeout
  headers: {
    "Content-Type": "application/json", // Set your desired headers
  },
});

export const useAxios = () => {
  const { getToken } = useKindeAuth();
  apiClient.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return apiClient;
};
