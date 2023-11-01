import { TOKEN_KEY } from "@/constant";
import { createAxiosClient } from "@/utils";
import Cookies from "js-cookie";

const BASE_URL = process.env.API_URL || "http://localhost:9000/api";

export const httpClient = createAxiosClient({
  baseURL: BASE_URL,
});

httpClient.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
