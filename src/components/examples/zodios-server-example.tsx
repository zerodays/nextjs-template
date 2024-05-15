/* eslint-disable react/jsx-no-literals */
import { apiClient } from '@/zodios/zodios';

const ZodiosServerExample = async () => {
  const data = await apiClient.getRandomJoke();

  return (
    <div className="flex flex-col gap-y-2">
      <p>
        Below is the data returned from an external API connected through zodios
        client.
      </p>
      <textarea
        readOnly
        className="h-44 rounded-lg p-4 text-sm focus:outline-foreground"
        value={JSON.stringify(data, null, 2)}
      />
    </div>
  );
};

export default ZodiosServerExample;
