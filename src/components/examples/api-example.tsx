/* eslint-disable react/jsx-no-literals */
'use client';

import { useGetRandomFact } from '@/api/endpoints';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

const ApiExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useGetRandomFact(undefined, {
    query: { enabled: false },
  });

  const handleFetch = async () => {
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleFetch} disabled={isLoading}>
      Call API
    </Button>
  );
};

export default ApiExample;
