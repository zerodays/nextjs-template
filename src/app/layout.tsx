import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import env from '@/env';

export function generateMetadata(): Metadata {
  const baseTitle = 'NextJS Template';
  const isDevelopment = env.NODE_ENV === 'development';
  const title = isDevelopment ? `[DEV] ${baseTitle}` : baseTitle;
  return {
    title,
    description: 'NextJS template project',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
