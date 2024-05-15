'use client';

/* eslint-disable react/jsx-no-literals */
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ToastExample = () => {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
        })
      }>
      Show Toast
    </Button>
  );
};

export default ToastExample;
