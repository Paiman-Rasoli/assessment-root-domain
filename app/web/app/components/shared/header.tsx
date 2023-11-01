"use client";

import { useMeQuery, useUserInfo } from "@/components/hooks";
import { LOGIN_PAGE, TOKEN_KEY } from "@/constant";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type HeaderProps = {
  children: React.ReactNode;
};

export function Header({ children }: HeaderProps) {
  const token = Cookies.get(TOKEN_KEY);
  const { setUser, email, fullName } = useUserInfo((state) => ({
    setUser: state.setUser,
    email: state.email,
    fullName: `${state.firstName} ${state.lastName}`,
  }));
  const router = useRouter();

  const { isLoading, isError, data } = useMeQuery(
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

  return (
    <div className="h-full">
      {isLoading || isError ? (
        <div className="flex h-full items-center justify-center">
          <img src="/spin.svg" className="w-8" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}
