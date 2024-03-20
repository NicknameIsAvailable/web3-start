import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { cookieToInitialState, WagmiProvider } from 'wagmi';
import { config } from '@/app/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Providers } from '@/components/providers';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WEB3 Start',
  description: 'My test project with web3'
};

const queryClient = new QueryClient();

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <html lang='en'>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}>
        <Providers initialState={initialState}>
          <Header />
          <main className='min-h-screen'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
