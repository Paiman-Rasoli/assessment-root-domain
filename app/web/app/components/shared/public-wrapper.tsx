"use client";

import { QueryClientProvider } from "@/components/providers/query-client-provider";
import { ToastContainer } from "react-toastify";

type PublicWrapperProps = {
  children: React.ReactNode;
};

export function PublicWrapper({ children }: PublicWrapperProps) {
  return (
    <>
      <QueryClientProvider>{children}</QueryClientProvider>
      <ToastContainer />
    </>
  );
}
