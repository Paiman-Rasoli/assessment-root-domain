import axios, { AxiosHeaders } from "axios";
import { HeadersDefaults, RawAxiosRequestHeaders } from "axios";

interface AxiosClientConfig {
  baseURL: string;
  headers?: RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults>;
}

export const createAxiosClient = (config: AxiosClientConfig) => {
  const client = axios.create({
    baseURL: config.baseURL,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  });

  client.interceptors.response.use((res) => res.data);

  return client;
};
