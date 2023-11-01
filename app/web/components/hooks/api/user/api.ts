import { httpClient } from "@/config";
import { UseMutationOptions, UseQueryOptions } from "@/utils";
import { AnalyticResult, UpdateInput, User } from "./types";
import { useMutation, useQuery } from "react-query";

const ME_ENDPOINT = "/users/me";
const ANALYTIC_ENDPOINT = "/users/analytic";

const ME_QUERY_KEY = "me";
const ANALYTIC_KEY = "analytic";

export const useMeQuery = (
  params?: Record<string, string | number>,
  options?: UseQueryOptions<User, typeof ME_QUERY_KEY>
) => {
  const queryFn = () => httpClient.get(ME_ENDPOINT, params);
  return useQuery(ME_QUERY_KEY, queryFn, options);
};

export const useAnalyticQuery = (
  params?: Record<string, string | number>,
  options?: UseQueryOptions<AnalyticResult, typeof ANALYTIC_KEY>
) => {
  const queryFn = () => httpClient.get(ANALYTIC_ENDPOINT, params);
  return useQuery(ANALYTIC_KEY, queryFn, options);
};

export const useUpdateMe = (
  options?: UseMutationOptions<UpdateInput, boolean>
) => {
  const mutationFn = (data: UpdateInput): any =>
    httpClient.put(ME_ENDPOINT, data);
  return useMutation(mutationFn, options);
};
