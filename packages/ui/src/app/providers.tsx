"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useState, type PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";

import { wagmiConfig } from "@/lib/wagmi";
import { RootStoreProvider } from "@/store";

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient({}));
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>
          <RootStoreProvider>
            {children}
          </RootStoreProvider>
        </ReactQueryStreamedHydration>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
