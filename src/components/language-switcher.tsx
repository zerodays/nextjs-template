'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

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
import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n,
} from '@/i18n/client';
import { LOCALES, Locale } from '@/i18n/i18n';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const languages = LOCALES.map((locale) => {
  return {
    value: locale,
    label: new Intl.DisplayNames([locale], { type: 'language' }).of(locale),
  };
});

const LanguageSwitcher = () => {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();
  const t = useScopedI18n('common');

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between">
          {locale
            ? languages.find((language) => language.value === locale)?.label
            : t('selectLanguage')}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>{t('noItems')}</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue) => {
                    changeLocale(currentValue as Locale);
                    setOpen(false);
                  }}>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      locale === language.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
