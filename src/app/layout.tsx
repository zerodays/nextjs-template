import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import env from '@/env';

export const metadata: Metadata = {
  title: 'NextJS Template',
  description: 'NextJS template project',
};

const isDevelopment = env.NODE_ENV === 'development';
if (isDevelopment) {
  metadata.title = `[DEV] ${metadata.title}`;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
