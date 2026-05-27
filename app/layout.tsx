import type { Metadata } from 'next';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';

export const metadata: Metadata = {
  title: 'Danso Group of Companies',
  description:
    'Empowering African businesses with world-class technology — software, security, and solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
