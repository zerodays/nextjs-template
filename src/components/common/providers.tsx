'use client';

import ThemeProvider from '@/components/common/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

export default function Providers({ children }: PropsWithChildren) {
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
            onSuccess: (data) => {
              toast('Success!', {
                description: JSON.stringify(data, null, 2),
                action: {
                  label: 'Dismiss',
                  onClick: () => console.log('Dismiss'),
                },
              });
            },
          },
        },
      }),
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
