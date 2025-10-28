'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { type PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';
import { I18nProvider } from '@/i18n/client';
import type { Locale } from '@/i18n/i18n';
import { AuthProvider } from '@/lib/providers/auth-provider';

interface ProvidersProps extends PropsWithChildren {
  locale: Locale;
}

export default function Providers({ children, locale }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onSuccess: (data) => {
              toast('Success!', {
                description: JSON.stringify(data, null, 2),
                action: {
                  label: 'Dismiss',
                  onClick: () => console.log('Dismiss'),
                },
              });
            },
            onError: (error) => {
              toast('Error!', {
                description: (error as Error).message,
                action: {
                  label: 'Dismiss',
                  onClick: () => console.log('Dismiss'),
                },
              });
            },
          },
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: false,
          },
        },
      }),
  );

  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          <I18nProvider locale={locale}>{children}</I18nProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
