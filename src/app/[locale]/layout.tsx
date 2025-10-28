import { Toaster } from '@/components/ui/sonner';
import env from '@/env';
import { type Locale, defaultLocale, isLocale } from '@/i18n/i18n';
import { getScopedI18n } from '@/i18n/server';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import type { ReactNode } from 'react';
import Providers from '../providers';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('metadata');
  const baseTitle = t('title');
  const description = t('description');
  const isDevelopment = env.NODE_ENV === 'development';
  const title = isDevelopment ? `[DEV] ${baseTitle}` : baseTitle;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: 'images/og-image.jpeg',
        },
      ],
    },
  };
}

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}) {
  let computedLocale: Locale = defaultLocale;
  const { locale } = await params;
  if (isLocale(locale)) {
    computedLocale = locale;
  }

  return (
    <html lang={computedLocale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}>
        <Providers locale={computedLocale}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
