import en from '../messages/en.json';

type Messages = typeof en;

// Augments next-intl's global type so t() auto-completes valid keys and
// flags non-existent keys as TypeScript errors at compile time.
declare global {
  interface IntlMessages extends Messages {}
}
