import type { Metadata } from 'next';
import './globals.css';
import AppProvider from '@/app/provider';
import Sidebar from '@/components/layout/sidebar';

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
        <AppProvider>
          <Sidebar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
