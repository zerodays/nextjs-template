// @ts-check
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  tailwindConfig: './tailwind.config.ts',
  tailwindAttributes: ['className'],
  tailwindFunctions: ['cn', 'tw', 'clsx', 'cva'],
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
};
