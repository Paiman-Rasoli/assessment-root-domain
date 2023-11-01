"use client";

import { Inter } from "next/font/google";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { PublicWrapper } from "../components/shared/public-wrapper";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { DASHBOARD_PAGE, TOKEN_KEY } from "@/constant";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = Cookies.get(TOKEN_KEY);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace(DASHBOARD_PAGE);
    }
  }, [token]);
  return (
    <html lang="en">
      <body className={inter.className}>
        <PublicWrapper>{children}</PublicWrapper>
      </body>
    </html>
  );
}
