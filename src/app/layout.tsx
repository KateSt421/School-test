// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/Header';
import { SiteFooter } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'User Management App',
  description: 'Application for managing user accounts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1 container mx-auto px-4 py-4 max-w-7xl">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}