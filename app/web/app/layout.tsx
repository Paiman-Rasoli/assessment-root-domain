import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { PublicWrapper } from "./components/shared/public-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assessment Dashboard",
  description: "This project you integrated with realtime APIs and Database!",
};

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
