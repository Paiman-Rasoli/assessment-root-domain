import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { QueryClientProvider } from "@/components/providers/query-client-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "../components/shared/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to dashboard",
  description: "In here you can see the statistics of users",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
      <ToastContainer />
    </html>
  );
}
