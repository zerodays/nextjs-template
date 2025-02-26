/* eslint-disable react/jsx-no-literals */
'use client';

import { useGetRandomFact } from '@/api/endpoints';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ApiExample = () => {
  const { isFetching, refetch } = useGetRandomFact(undefined, {
    query: { enabled: false },
  });

  const handleFetch = async () => {
    try {
      const res = await refetch();

      if (res.isSuccess && res.data) {
        toast('Random cat fact', {
          description: res.data.data.fact,
        });
      } else {
        toast.error('Failed to fetch a random fact!');
      }
    } catch (error) {
      toast.error('An error occurred while fetching the fact');
      console.error(error);
    }
  };

  return (
    <Button variant="outline" onClick={handleFetch} disabled={isFetching}>
      Call API
    </Button>
  );
};

export default ApiExample;
