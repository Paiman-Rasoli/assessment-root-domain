import { httpClient } from "@/config";
import { UseMutationOptions, UseQueryOptions } from "@/utils";
import { UpdateInput, User } from "./types";
import { useMutation, useQuery } from "react-query";

const ME_ENDPOINT = "/users/me";
const ME_QUERY_KEY = "me";

export const useMeQuery = (
  params?: Record<string, string | number>,
  options?: UseQueryOptions<User, typeof ME_QUERY_KEY>
) => {
  const queryFn = () => httpClient.get(ME_ENDPOINT, params);
  return useQuery(ME_QUERY_KEY, queryFn, options);
};

export const useUpdateMe = (
  options?: UseMutationOptions<UpdateInput, boolean>
) => {
  const mutationFn = (data: UpdateInput): any =>
    httpClient.put(ME_ENDPOINT, data);
  return useMutation(mutationFn, options);
};
