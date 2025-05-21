import { createI18nServer } from 'next-international/server';
import type { UnsafeT } from './i18n';

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import('./en'),
  sl: () => import('./sl'),
});

export const getUnsafeI18n = getI18n as unknown as () => Promise<UnsafeT>;
export const getUnsafeScopedI18n = getScopedI18n as unknown as (
  scope: string,
) => Promise<UnsafeT>;
