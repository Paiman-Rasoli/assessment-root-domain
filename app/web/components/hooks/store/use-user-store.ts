import { createWithEqualityFn } from "zustand/traditional";
import { User } from "../api/user/types";

export interface UserState extends User {
  setUser: (user: User) => void;
}

export const useUserInfo = createWithEqualityFn<UserState>(
  (set) => ({
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    signupMode: undefined,
    createdAt: new Date(),
    setUser: (userInput) => {
      set(() => ({
        id: userInput.id,
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        email: userInput.email,
        signupMode: userInput.signupMode,
        createdAt: userInput.createdAt,
      }));
    },
  }),
  Object.is
);
