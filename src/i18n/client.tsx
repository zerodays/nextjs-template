'use client';

import { createI18nClient } from 'next-international/client';
import type { ReactNode } from 'react';
import type { Locale, UnsafeT } from './i18n';

import { defaultLocale } from './i18n';

export const {
  useI18n,
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n,
  I18nProviderClient,
} = createI18nClient({
  en: () => import('./en'),
  sl: () => import('./sl'),
});

export const useUnsafeI18n = useI18n as unknown as () => UnsafeT;
export const useUnsafeScopedI18n = useScopedI18n as unknown as () => UnsafeT;

export function I18nProvider({
  children,
  locale,
  fallback,
}: {
  children: React.ReactNode;
  locale: Locale;
  fallback?: ReactNode;
}) {
  return (
    <I18nProviderClient locale={locale ?? defaultLocale} fallback={fallback}>
      {children}
    </I18nProviderClient>
  );
}
