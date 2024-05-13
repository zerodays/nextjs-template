import type { ReactNode } from 'react';

export const LOCALES = ['en', 'sl'] as const;

export type Locale = (typeof LOCALES)[number];

export const defaultLocale = 'sl';

export const isLocale = (
  locale: string | null | undefined,
): locale is Locale => {
  if (!locale) {
    return false;
  }
  return LOCALES.includes(locale as Locale);
};

export type UnsafeT = (
  localeKey: string,
  params?: Record<string, string | ReactNode | number>,
) => string | ReactNode;

/**
 * Strip locale from pathname.
 * @example
 * stripLocaleFromPathName('/sl/test') // => '/test'
 * stripLocaleFromPathName('/en/test') // => '/en/test'
 * stripLocaleFromPathName('/test') // => '/test'
 */
export const stripLocaleFromPathName = (pathname: string) => {
  for (const locale of LOCALES) {
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }
  return pathname;
};

// Assert that defaultLocale is in LOCALES
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkDefaultLocale: Locale = defaultLocale;
