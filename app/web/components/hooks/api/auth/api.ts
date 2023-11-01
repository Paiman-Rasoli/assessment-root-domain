import { UseMutationOptions } from "@/utils";
import { LoginInput, RegisterInput, VerifiedUser, VerifyInput } from "./types";
import { httpClient } from "@/config";
import { useMutation } from "react-query";

const AUTH_ENDPOINT = "/auth/login";
const VERIFY_ENDPOINT = "/auth/verify";
const REGISTER_ENDPOINT = "/auth/register";

export const useLoginMutation = (
  options?: UseMutationOptions<LoginInput, VerifiedUser>
) => {
  const mutationFn = (data: LoginInput): any =>
    httpClient.post(AUTH_ENDPOINT, data);
  return useMutation(mutationFn, options);
};

export const useVerifyMutation = (
  options?: UseMutationOptions<VerifyInput, VerifiedUser>
) => {
  const mutationFn = (data: VerifyInput): any =>
    httpClient.post(VERIFY_ENDPOINT, data);
  return useMutation(mutationFn, options);
};

export const useRegisetMutation = (
  options?: UseMutationOptions<RegisterInput, boolean>
) => {
  const mutationFn = (data: RegisterInput): any =>
    httpClient.post(REGISTER_ENDPOINT, data);
  return useMutation(mutationFn, options);
};
