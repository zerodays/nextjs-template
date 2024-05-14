/* eslint-disable @typescript-eslint/no-var-requires */
// Simple script to validate translations
// Usage: pnpm i18n

import { readdirSync } from 'fs';
import path from 'path';

import { defaultLocale, LOCALES } from '../src/i18n/i18n';

const localesFolder = './src/i18n';
// 'require' imports work relative to the file, not the cwd
const localesFolderRelative = '../src/i18n';

const getLocalePath = (locale: string) => path.join(localesFolder, locale);

const getLocaleFile = (locale: string, file: string) =>
  path.join(path.join(localesFolderRelative, locale), file);

/**
 * Deep diff between keys of two objects.
 * @param  {Object} obj1 Object compared
 * @param  {Object} obj2 Object to compare with
 * @return Return a three element array with:
 * - the keys present in obj1 but not in obj2
 * - the keys present in obj2 but not in obj1
 * - keys where the type of value is invalid (different from obj1 to obj2 or not string or object)
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const deepKeysDiff = (
  /* eslint-disable @typescript-eslint/no-explicit-any */
  obj1: any,
  obj2: any,
): { missingKeys: string[]; extraKeys: string[]; invalidTypes: string[] } => {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    console.error(
      `Both arguments must be objects, got ${typeof obj1} and ${typeof obj2}`,
    );
    process.exit(1);
  }

  const missingKeys: string[] = [];
  const extraKeys: string[] = [];
  const invalidTypes: string[] = [];

  const pairs1 = pairsWithoutPlural(obj1);
  const pairs2 = pairsWithoutPlural(obj2);

  for (const pair of pairs1) {
    const key = pair.key;

    // Check if key is present in obj2
    const otherPair = pairs2.find((pair2) => pair2.key === key);
    if (!otherPair) {
      missingKeys.push(key);
      continue;
    }

    // Check type of value
    if (typeof pair.value !== typeof otherPair.value) {
      invalidTypes.push(key);
      continue;
    }

    const type = typeof pair.value;

    if (type === 'string') {
      // If value is a string, we're done
    } else if (type === 'object') {
      // If value is an object, recurse
      const {
        missingKeys: missingKeys2,
        extraKeys: extraKeys2,
        invalidTypes: invalidTypes2,
      } = deepKeysDiff(obj1[key], obj2[key]);

      // Prepend key to keys
      missingKeys.push(...missingKeys2.map((key2: string) => `${key}.${key2}`));
      extraKeys.push(...extraKeys2.map((key2: string) => `${key}.${key2}`));
      invalidTypes.push(
        ...invalidTypes2.map((key2: string) => `${key}.${key2}`),
      );
    } else {
      // If value is neither a string nor an object, this is invalid translation.
      invalidTypes.push(key);
    }
  }

  // Check if there are extra keys in obj2
  for (const pair of pairs2) {
    if (!pairs1.find((pair1) => pair1.key === pair.key)) {
      extraKeys.push(pair.key);
    }

    // No need to recurse here, we already checked all keys in obj1.
  }

  return {
    missingKeys,
    extraKeys,
    invalidTypes,
  };
};

// See docs here for supported suffixes:
// https://www.i18next.com/translation-function/plurals#languages-with-multiple-plurals
const plural_suffixes = ['zero', 'one', 'two', 'few', 'many', 'other'];

function stripPluralSuffix(key: string): string {
  for (const suffix of plural_suffixes) {
    if (key.endsWith(`#${suffix}`)) {
      return key.slice(0, -suffix.length - 1);
    }
  }

  return key;
}

function pairsWithoutPlural(obj: any) {
  const keys: { key: string; value: any }[] = [];
  for (const key in obj) {
    const isString = typeof obj[key] === 'string';

    if (isString) {
      keys.push({ key: stripPluralSuffix(key), value: obj[key] });
    } else {
      keys.push({ key, value: obj[key] });
    }
  }
  // Remove duplicates
  return keys.filter(
    (pair, index, self) => self.findIndex((p) => p.key === pair.key) === index,
  );
}

const validateDefaultLocale = () => {
  if (!LOCALES.includes(defaultLocale)) {
    console.error(`Default locale '${defaultLocale}' is invalid.`);
    process.exit(1);
  }
};

const validateFiles = (locale: string, defaultLocaleFiles: any[]) => {
  for (const file of defaultLocaleFiles) {
    // Open js text files
    const defaultLocaleFile = getLocaleFile(defaultLocale, file);
    const localeFile = getLocaleFile(locale, file);

    const defaultLocaleData = require(defaultLocaleFile);
    const localeData = require(localeFile);

    // Check if all keys in default locale are present in locale
    const { missingKeys, extraKeys, invalidTypes } = deepKeysDiff(
      defaultLocaleData,
      localeData,
    );

    if (missingKeys.length > 0) {
      console.error(
        `Missing keys in ${getLocaleFile(locale, file)}:`,
        missingKeys,
      );
    }

    if (extraKeys.length > 0) {
      console.error(`Extra keys in ${getLocaleFile(locale, file)}:`, extraKeys);
    }

    if (invalidTypes.length > 0) {
      console.error(
        `Invalid types in ${getLocaleFile(locale, file)}:`,
        invalidTypes,
      );
    }

    if (
      missingKeys.length > 0 ||
      extraKeys.length > 0 ||
      invalidTypes.length > 0
    ) {
      process.exit(1);
    }
  }
};

const isNotTsFile = (file: string) =>
  !(file.endsWith('.ts') || file.endsWith('.tsx'));

const validate = () => {
  // 1.
  // Check if all locales in config are present in i18n folder and vice versa
  const locales = readdirSync(localesFolder).filter(isNotTsFile);

  const missingLocales = LOCALES.filter(
    (locale: string) => !locales.includes(locale),
  );

  if (missingLocales.length > 0) {
    console.error(`Missing locales in ${localesFolder}:`, missingLocales);
    process.exit(1);
  }

  const extraLocales = locales.filter(
    (locale: string) => !LOCALES.includes(locale as any),
  );

  if (extraLocales.length > 0) {
    console.error('Extra locales in public/locales:', extraLocales);
    process.exit(1);
  }

  // 2.
  // Check if default locale is valid
  validateDefaultLocale();

  const defaultLocaleFiles = readdirSync(getLocalePath(defaultLocale));

  for (const locale of locales) {
    // Skip default locale
    if (locale === defaultLocale) {
      continue;
    }

    // 3.
    // Check if namespaces match
    const localeFiles = readdirSync(getLocalePath(locale));

    const missingNamespaces = defaultLocaleFiles.filter(
      (file: string) => !localeFiles.includes(file),
    );

    if (missingNamespaces.length > 0) {
      console.error(
        `Missing namespaces in ${getLocalePath(locale)}:`,
        missingNamespaces,
      );
      process.exit(1);
    }

    const extraNamespaces = localeFiles.filter(
      (file: string) => !defaultLocaleFiles.includes(file),
    );

    if (extraNamespaces.length > 0) {
      console.error(
        `Extra namespaces in ${getLocalePath(locale)}:`,
        extraNamespaces,
      );
      process.exit(1);
    }

    // 4.
    // Check if keys match
    validateFiles(locale, defaultLocaleFiles);
  }
  console.log('All good! 🎉');
};

// Run validation only if script is called directly
if (require.main === module) {
  validate();
}

module.exports = {
  deepKeysDiff,
};
