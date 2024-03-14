import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { ConvexClientProvider } from '@/providers/convex-client-provide';
import { ModalProvider } from '@/providers/modal-provider';

import './globals.css';
import { Suspense } from 'react';
import { Loading } from '@/components/auth/loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MirrorMind',
  icons: '/logo.svg'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            {children}
            <ModalProvider />
            <Toaster />
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
