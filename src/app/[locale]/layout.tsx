import { Toaster } from '@/components/ui/sonner';
import { type Locale, defaultLocale, isLocale } from '@/i18n/i18n';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';
import type { ReactElement } from 'react';
import Providers from '../providers';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: ReactElement;
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
