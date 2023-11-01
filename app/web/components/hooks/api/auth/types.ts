import { User } from "../user/types";

export type LoginInput = {
  email: string;
  password: string;
};

export type VerifiedUser = {
  access_token: string;
} & User;

export type VerifyInput = {
  code: string;
};

export type RegisterInput = Pick<User, "lastName" | "firstName" | "email"> & {
  password: string;
};

export type ResetPasswordInput = {
  oldPassword: string;
  newPassword: string;
};
