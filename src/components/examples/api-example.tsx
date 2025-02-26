/* eslint-disable react/jsx-no-literals */
'use client';

import { useGetRandomFact } from '@/api/endpoints';
import { Button } from '@/components/ui/button';
import { useScopedI18n } from '@/i18n/client';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';

const ApiExample = () => {
  const t = useScopedI18n('home.apiExample');

  const { isFetching, refetch } = useGetRandomFact(undefined, {
    query: { enabled: false },
  });

  const handleFetch = async () => {
    try {
      const res = await refetch();

      if (res.isSuccess && res.data) {
        toast(t('toastTitle'), {
          description: res.data.data.fact,
        });
      } else {
        toast.error(t('toastError'));
      }
    } catch (error) {
      toast.error(t('fetchError'));
      console.error(error);
    }
  };

  return (
    <Button variant="outline" onClick={handleFetch} disabled={isFetching}>
      {isFetching ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        t('submit')
      )}
    </Button>
  );
};

export default ApiExample;
