import { Toaster } from '@/components/ui/sonner';
import { I18nProvider } from '@/i18n/client';
import { defaultLocale, isLocale, Locale } from '@/i18n/i18n';
import { ReactElement } from 'react';

export default function Layout({
  params: { locale: localeString },
  children,
}: {
  params: { locale: string };
  children: ReactElement;
}) {
  let locale: Locale = defaultLocale;
  if (isLocale(localeString)) {
    locale = localeString;
  }

  return (
    <I18nProvider locale={locale}>
      {children}
      <Toaster />
    </I18nProvider>
  );
}
