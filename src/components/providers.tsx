'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { type State, WagmiProvider } from 'wagmi';

import { config } from '@/app/config';
import { ThemeProvider } from '@/components/theme-provider';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { sdkOptions } from '@/web3/metamask';

type Props = {
  children: ReactNode;
  initialState: State | undefined;
};

const queryClient = new QueryClient();

export function Providers({ children, initialState }: Props) {
  return (
    <ThemeProvider>
      <WagmiProvider config={config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <MetaMaskProvider sdkOptions={sdkOptions}>{children}</MetaMaskProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
