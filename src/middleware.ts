// middleware.ts
import { createI18nMiddleware } from 'next-international/middleware';
import { NextRequest } from 'next/server';

import { defaultLocale, LOCALES } from './i18n/i18n';

const I18nMiddleware = createI18nMiddleware({
  locales: LOCALES,
  defaultLocale: defaultLocale,
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt|_axiom).*)'],
};
