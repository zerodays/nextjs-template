/* eslint-disable react/jsx-no-literals */
import LanguageSwitcher from '@/components/common/language-switcher';
import ThemeToggle from '@/components/common/theme-toggle';
import ExampleCard from '@/components/examples/example-card';
import { FormExample } from '@/components/examples/form-example';
import SentryExample from '@/components/examples/sentry-example';
import ToastExample from '@/components/examples/toast-example';
import ZodiosClientExample from '@/components/examples/zodios-client-example';
import ZodiosServerExample from '@/components/examples/zodios-server-example';
import { BackgroundBeams } from '@/components/ui/background-beams';
import env from '@/env';
import { getScopedI18n } from '@/i18n/server';
import path from 'path';

export default async function Home() {
  const t = await getScopedI18n('home');

  return (
    <main className="flex h-screen flex-col items-stretch gap-y-8 p-8">
      <BackgroundBeams />
      <div className="flex items-center justify-end gap-x-8">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <div className="relative grow">
        <div className="absolute inset-0 grid grid-cols-2 gap-x-8">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-5xl font-bold">{t('title')}</h1>
            <p className="font-mono">{t('subtitle')}</p>
          </div>
          <div className="flex h-full flex-col gap-y-8 overflow-auto">
            <ExampleCard
              title="✅ Form example"
              subtitle={
                <p>
                  Check out{' '}
                  <CodeLink filePath="/src/components/examples/form-example.tsx" />{' '}
                  to see how its made
                </p>
              }>
              <FormExample />
            </ExampleCard>
            <ExampleCard
              title="🚀 Sentry example"
              subtitle={
                <p>
                  Check out{' '}
                  <CodeLink filePath="/src/components/examples/sentry-example.tsx" />{' '}
                  to see how its made
                </p>
              }>
              <SentryExample />
            </ExampleCard>
            <ExampleCard
              title="🔔 Toast example"
              subtitle={
                <p>
                  Check out{' '}
                  <CodeLink filePath="/src/components/examples/toast-example.tsx" />{' '}
                  to see how its made
                </p>
              }>
              <ToastExample />
            </ExampleCard>
            <ExampleCard
              title="🔗 Zodios server example"
              subtitle={
                <p>
                  Check out{' '}
                  <CodeLink filePath="/src/components/examples/zodios-server-example.tsx" />{' '}
                  to see how its made
                </p>
              }>
              <ZodiosServerExample />
            </ExampleCard>
            <ExampleCard
              title="🔗 Zodios client example"
              subtitle={
                <p>
                  Check out{' '}
                  <CodeLink filePath="/src/components/examples/zodios-client-example.tsx" />{' '}
                  to see how its made
                </p>
              }>
              <ZodiosClientExample />
            </ExampleCard>
          </div>
        </div>
      </div>
    </main>
  );
}

const CodeLink = ({
  filePath,
  lineNumber = 1,
}: {
  filePath: string;
  lineNumber?: number;
}) => {
  let url = '';
  if (env.NODE_ENV === 'development') {
    const projectRoot = process.cwd();
    const absolutePath = path.join(projectRoot, filePath);
    url = `vscode://file/${absolutePath}:${lineNumber}`;
  } else {
    url = `https://github.com/zerodays/nextjs-template/tree/master/${filePath}`;
  }
  const fileName = filePath.split('/').pop();

  return (
    <span className="mx-1 rounded-lg bg-foreground px-2 text-sm font-semibold text-background transition-colors hover:bg-foreground/70">
      <a href={url} rel="noopener noreferrer">
        {fileName}
      </a>
    </span>
  );
};
