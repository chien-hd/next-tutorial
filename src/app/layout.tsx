import type { Metadata } from 'next';
import './globals.css';
import AppProvider from '@/app/provider';

export const metadata: Metadata = {
  title: 'Next.js Tutorial',
  description: 'Nextjs 14 learning',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
