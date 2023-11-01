"use client";

import React from "react";
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderReactQuery,
} from "react-query";

const handleCheckError = (error: any) => {
  console.error(error);
  return error;
};

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            keepPreviousData: true,

            refetchOnWindowFocus: true,

            refetchOnMount: true,

            retry: (failureCount: number, error: any) =>
              error?.message === "Error Network request failed" &&
              failureCount < 4,
            onError: handleCheckError,
          },

          mutations: {
            onError: handleCheckError,
          },
        },
      })
  );

  return (
    <QueryClientProviderReactQuery client={queryClient}>
      {children}
    </QueryClientProviderReactQuery>
  );
}
