import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout';
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,700&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Interview Coach',
  description: 'Practice interviews with AI feedback',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}