/* eslint-disable react/jsx-no-literals */
import CodeLink from '@/components/common/code-link';
import LanguageSwitcher from '@/components/common/language-switcher';
import MarkdownDisplay from '@/components/common/markdown-display';
import Navbar from '@/components/common/navbar';
import ThemeToggle from '@/components/common/theme-toggle';
import {
  FormExample,
  SentryExample,
  ToastExample,
  ZodiosClientExample,
  ZodiosServerExample,
} from '@/components/examples';
import ExampleCard from '@/components/examples/example-card';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { getScopedI18n } from '@/i18n/server';
import { FaGithub } from 'react-icons/fa';
import readme from '../../../docs/README.md';

export default async function Home() {
  const t = await getScopedI18n('home');

  return (
    <main className="flex flex-col items-stretch gap-y-8 py-4">
      <BackgroundBeams />
      <Navbar>
        <a
          className="justify-self-center"
          target="_blank"
          href="https://github.com/zerodays/nextjs-template"
          rel="noreferrer">
          <FaGithub className="h-8 w-8 transition-colors hover:text-foreground/70" />
        </a>
        <div className="flex items-center gap-x-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </Navbar>

      <div className="container relative grow pb-20">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3">
          <div className="flex flex-col gap-y-4 lg:col-span-2">
            <h1 className="text-5xl font-bold">{t('title')}</h1>
            <p className="font-mono">{t('subtitle')}</p>
            <div className="relative grow">
              <div className="flex flex-col pt-8 scrollbar-none lg:overflow-auto">
                <MarkdownDisplay content={readme} />
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col gap-y-8 scrollbar-none lg:overflow-auto">
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
              title="🔗 Zodios use on server example"
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
              title="🔗 Zodios use on client example"
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
