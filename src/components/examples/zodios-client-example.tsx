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
import { Separator } from '@/components/ui/separator';
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

  return (
    <div className="flex flex-col gap-y-2 rounded-lg bg-foreground/5 p-4 backdrop-blur-sm">
      <p className="font-semibold">
        This is an example of{' '}
        <span className="rounded-lg bg-foreground px-1 font-bold text-background">
          client side
        </span>{' '}
        Zodios Hooks usage.
      </p>
      <p>
        Below is the data returned from an external API connected through zodios
        client.
      </p>
      <Separator className="my-2" />
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
      <div className="flex h-48 items-center justify-center overflow-hidden rounded-lg bg-black">
        {isLoading || isRefetching ? (
          <div>Loading...</div>
        ) : (
          <textarea
            className="h-full w-full p-4"
            value={data && JSON.stringify(data[0], null, 2)}
          />
        )}
      </div>
    </div>
  );
};

export default ZodiosClientExample;
