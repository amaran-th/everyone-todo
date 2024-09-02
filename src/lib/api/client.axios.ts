import axios from "axios";

import { categorizeError } from "@/types/error";
import cookies from "react-cookies";
export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(categorizeError(error))
);

export const authClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

authClient.interceptors.request.use((config) => {
  const auth = cookies.load("auth");
  if (auth?.access_token) {
    config.headers.Authorization = `Bearer ${auth.access_token}`;
  }
  return config;
});

authClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(categorizeError(error))
);
