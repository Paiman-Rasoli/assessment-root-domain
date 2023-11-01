import { httpClient } from "@/config";
import { UseQueryOptions } from "@/utils";
import { User } from "./types";
import { useQuery } from "react-query";

const ME_ENDPOINT = "/users/me";
const ME_QUERY_KEY = "me";

export const useMeQuery = (
  params?: Record<string, string | number>,
  options?: UseQueryOptions<User, typeof ME_QUERY_KEY>
) => {
  const queryFn = () => httpClient.get(ME_ENDPOINT, params);
  return useQuery(ME_QUERY_KEY, queryFn, options);
};
