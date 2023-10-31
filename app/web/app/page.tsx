"use client";

import { DASHBOARD_PAGE, LOGIN_PAGE, TOKEN_KEY } from "@/constant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Index() {
  const router = useRouter();
  const token = Cookies.get(TOKEN_KEY);

  useEffect(() => {
    if (token) {
      router.replace(DASHBOARD_PAGE);
    } else {
      router.replace(LOGIN_PAGE);
    }
  }, [token]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <img src="/spin.svg" />
    </div>
  );
}
