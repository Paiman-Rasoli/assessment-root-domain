import { AxiosError, AxiosResponse } from "axios";
import {
  UseQueryOptions as UseQueryOptionsAlias,
  UseMutationOptions as UseMutationOptionsAlias,
} from "react-query";

export type UseQueryOptions<T, K extends string> = Omit<
  UseQueryOptionsAlias<AxiosResponse["data"], AxiosError, T, K>,
  "queryKey" | "queryFn"
>;

export type UseMutationOptions<T, V> = UseMutationOptionsAlias<
  AxiosResponse<V>["data"],
  AxiosError,
  T,
  V
>;
