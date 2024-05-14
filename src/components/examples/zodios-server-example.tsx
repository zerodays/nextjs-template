/* eslint-disable react/jsx-no-literals */
import { Separator } from '@/components/ui/separator';
import { apiClient } from '@/zodios/zodios';

const ZodiosServerExample = async () => {
  const data = await apiClient.getRandomJoke();

  return (
    <div className="flex flex-col gap-y-2 rounded-lg bg-foreground/5 p-4 backdrop-blur-sm">
      <p className="font-semibold">
        This is an example of{' '}
        <span className="rounded-lg bg-foreground px-1 font-bold text-background">
          server side
        </span>{' '}
        Zodios client usage.
      </p>
      <p>
        Below is the data returned from an external API connected through zodios
        client.
      </p>
      <Separator className="my-2" />
      <textarea
        className="h-48 rounded-lg p-4"
        value={JSON.stringify(data, null, 2)}
      />
    </div>
  );
};

export default ZodiosServerExample;
