import { Toaster } from '@/components/ui/sonner';
import { I18nProvider } from '@/i18n/client';
import { defaultLocale, isLocale, Locale } from '@/i18n/i18n';
import { ReactElement } from 'react';

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
    <I18nProvider locale={computedLocale}>
      {children}
      <Toaster />
    </I18nProvider>
  );
}
