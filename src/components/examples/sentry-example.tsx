/* eslint-disable react/jsx-no-literals */
'use client';

import { Button } from '@/components/ui/button';
import * as Sentry from '@sentry/nextjs';

const SentryExample = () => {
  return (
    <Button
      onClick={() =>
        Sentry.startSpan(
          {
            name: 'Example Frontend Span',
            op: 'test',
          },
          () => {
            throw new Error('Sentry Example Frontend Error');
          },
        )
      }>
      Throw Sentry Error
    </Button>
  );
};

export default SentryExample;
