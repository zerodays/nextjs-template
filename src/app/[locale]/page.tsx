import LanguageSwitcher from '@/components/common/language-switcher';
import ThemeToggle from '@/components/common/theme-toggle';
import { FormExample } from '@/components/examples/form-example';
import SentryExample from '@/components/examples/sentry-example';
import ToastExample from '@/components/examples/toast-example';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { getScopedI18n } from '@/i18n/server';

export default async function Home() {
  const t = await getScopedI18n('home');

  return (
    <main className="flex min-h-screen flex-col items-stretch gap-y-8 p-8">
      <BackgroundBeams />
      <div className="flex items-center justify-end gap-x-8">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <div className="grid grow grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-5xl font-bold">{t('title')}</h1>
          <p className="font-mono">{t('subtitle')}</p>
        </div>
        <div className="flex flex-col gap-y-8">
          <FormExample />
          <SentryExample />
          <ToastExample />
        </div>
      </div>
    </main>
  );
}
