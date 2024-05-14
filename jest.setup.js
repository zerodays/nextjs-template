/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import '@testing-library/react';

const identity = (el) => el;

jest.mock('./src/i18n/server', () => ({
  getI18n: jest.fn().mockImplementation(() => jest.fn(identity)),
  getScopedI18n: jest.fn().mockImplementation(() => jest.fn(identity)),
}));

jest.mock('./src/i18n/client', () => ({
  useI18n: jest.fn().mockImplementation(() => jest.fn(identity)),
  useScopedI18n: jest.fn().mockImplementation(() => jest.fn(identity)),
  useUnsafeI18n: jest.fn().mockImplementation(() => jest.fn(identity)),
}));
