'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { type State, WagmiProvider } from 'wagmi';

import { config } from '@/web3/config';
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
    <WagmiProvider config={config} initialState={initialState}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          <MetaMaskProvider sdkOptions={sdkOptions}>{children}</MetaMaskProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </WagmiProvider>
  );
}
