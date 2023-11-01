"use client";

import { useLogoutMutation, useMeQuery, useUserInfo } from "@/components/hooks";
import { LOGIN_PAGE, TOKEN_KEY } from "@/constant";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type HeaderProps = {
  children: React.ReactNode;
};

export function Header({ children }: HeaderProps) {
  const token = Cookies.get(TOKEN_KEY);
  const { mutateAsync: logoutMutate } = useLogoutMutation();
  const router = useRouter();
  const { setUser, email, fullName } = useUserInfo((state) => ({
    setUser: state.setUser,
    email: state.email,
    fullName: `${state.firstName} ${state.lastName}`,
  }));

  const { isLoading, isError } = useMeQuery(
    {},
    {
      enabled: !token || !email,
      onSuccess: (data) => {
        setUser(data);
      },
      onError: (error) => {
        // INSTANT REMOVE
        if ([401, 403, 404].includes(error?.response?.status as number)) {
          Cookies.remove(TOKEN_KEY);
          router.replace(LOGIN_PAGE);
        }
      },
    }
  );

  const handleLogout = useCallback(() => {
    logoutMutate({}).then(() => {
      Cookies.remove(TOKEN_KEY);
      router.push(LOGIN_PAGE);
    });
  }, [logoutMutate, router]);

  return (
    <div className="h-full">
      {isLoading || isError ? (
        <div className="flex h-full items-center justify-center">
          <img src="/spin.svg" className="w-8" />
        </div>
      ) : (
        <div className="h-full">
          <header className="bg-gray-800 py-4">
            <div className="container mx-auto flex items-center justify-between px-4">
              <h1 className="text-white text-2xl capitalize">{fullName}</h1>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <a href="#" className="text-white hover:text-gray-300">
                      Profile
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:text-gray-300"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          {children}
        </div>
      )}
    </div>
  );
}