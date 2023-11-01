"use client";

import { Inter } from "next/font/google";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { PublicWrapper } from "../components/shared/public-wrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PublicWrapper>{children}</PublicWrapper>
      </body>
    </html>
  );
}
