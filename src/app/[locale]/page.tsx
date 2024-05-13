import LanguageSwitcher from '@/components/language-switcher';
import ThemeToggle from '@/components/theme-toggle';
import { getScopedI18n } from '@/i18n/server';

export default async function Home() {
  const t = await getScopedI18n('home');

  return (
    <main className="flex min-h-screen flex-col items-stretch gap-y-8 p-8">
      <div className="flex items-center justify-end gap-x-8">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <div className="grid grow grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-5xl font-bold">{t('title')}</h1>
          <p className="font-mono">{t('subtitle')}</p>
        </div>
        {/* <div className="flex flex-col gap-y-4">
          <h2 className="text-3xl font-bold">{t('section1.title')}</h2>
          <p>{t('section1.content')}</p>
        </div> */}
      </div>
    </main>
  );
}
