'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useScopedI18n } from '@/i18n/client';
import { Loader2Icon, SendIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Always use zod to validate your form
// In case form schema (or its type) is required elsewhere, move schema to a separate file
const formSchema = z.object({
  // Add localization keys for form field errors (so error messages can be localized)
  email: z.string().email('home.formExample.emailError'),
});

// Infer TS type from zod schema
type FormValues = z.infer<typeof formSchema>;

export const FormExample = () => {
  const t = useScopedI18n('home.formExample');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  // Use react-query to handle actual form submission
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  function onSubmit(data: FormValues) {
    console.log(data);
    toast(t('formSubmitted'));
    setIsLoading(true);
    form.reset();
  }

  // When form is submitting, disable inputs and button
  const disabled = isLoading;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          disabled={disabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input placeholder={t('emailPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="outline"
          className="gap-2"
          disabled={disabled}>
          {isLoading ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <SendIcon className="h-4 w-4" />
          )}
          {t('submit')}
        </Button>
      </form>
    </Form>
  );
};
