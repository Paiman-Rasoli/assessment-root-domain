import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { QueryClientProvider } from "@/components/providers/query-client-provider";

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
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
