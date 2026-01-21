import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultLocale, locales, messages } from "@acme/i18n";

// Convert nested structure to flat structure for i18next
const flattenMessages = (
  messages: Record<string, Record<string, unknown>>,
): Record<string, unknown> => {
  const flattened: Record<string, unknown> = {};
  Object.entries(messages).forEach(([namespace, translations]) => {
    Object.entries(translations as Record<string, string>).forEach(
      ([key, value]) => {
        flattened[`${namespace}.${key}`] = value;
      },
    );
  });
  return flattened;
};

// Initialize i18next for TanStack Start
void i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: flattenMessages(messages.en) },
      tr: { translation: flattenMessages(messages.tr) },
    },
    lng: defaultLocale, // default language
    fallbackLng: defaultLocale,
    supportedLngs: locales,
    interpolation: {
      escapeValue: false, // react already safes from xss
      prefix: "{",
      suffix: "}",
    },
    react: {
      useSuspense: true,
    },
  });

export { i18n };
export type { Locale } from "@acme/i18n";
export { locales, defaultLocale } from "@acme/i18n";
