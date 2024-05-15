/* eslint-disable react/jsx-no-literals */
'use client';

import { Button } from '@/components/ui/button';
import * as Sentry from '@sentry/nextjs';
import { toast } from 'sonner';

const SentryExample = () => {
  return (
    <Button
      variant="outline"
      onClick={() =>
        Sentry.startSpan(
          {
            name: 'Example Frontend Span',
            op: 'test',
          },
          () => {
            toast('Sentry Error has been thrown', {
              description:
                'Check Sentry for more details. In development mode sentry is disabled (has no SENTRY_DSN env variable set) by default.',
            });
            throw new Error('Sentry Example Frontend Error');
          },
        )
      }>
      Throw Sentry Error
    </Button>
  );
};

export default SentryExample;
