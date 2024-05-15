/* eslint-disable react/jsx-no-literals */
'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { api } from '@/zodios/zodios';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

const types = ['general', 'programming', 'knock-knock', 'pun'];

const ZodiosClientExample = () => {
  const [open, setOpen] = useState(false);
  const [jokeType, setJokeType] = useState('general');
  const { data, isLoading, isRefetching } = api.useGetRandomJokeByType({
    params: {
      type: jokeType,
    },
  });
  const { mutate } = api.useAddExample({
    params: {
      exampleId: 'example',
    },
  });

  return (
    <div className="flex flex-col gap-y-2">
      <p>
        Below is the data returned from an external API connected through zodios
        client.
      </p>
      <div className="flex justify-between">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between">
              {jokeType}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Select Joke Type" />
              <CommandEmpty>{'No items found'}</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {types.map((type) => (
                    <CommandItem
                      key={type}
                      value={type}
                      onSelect={(currentValue) => {
                        setJokeType(currentValue);
                        setOpen(false);
                      }}>
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          type === jokeType ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {type}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button
          variant="outline"
          onClick={() =>
            mutate({
              name: 'Example',
            })
          }>
          Trigger Error
        </Button>
      </div>
      <div className="flex h-44 items-center justify-center">
        {isLoading || isRefetching ? (
          <div>Loading...</div>
        ) : (
          <textarea
            readOnly
            className="h-full w-full rounded-lg p-4 text-sm focus:outline-foreground"
            value={data && JSON.stringify(data[0], null, 2)}
          />
        )}
      </div>
    </div>
  );
};

export default ZodiosClientExample;
