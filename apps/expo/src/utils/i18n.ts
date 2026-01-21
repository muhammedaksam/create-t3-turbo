import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultLocale, resources } from "@acme/i18n";

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4",
    resources,
    lng: Localization.getLocales()[0]?.languageCode ?? defaultLocale,
    fallbackLng: defaultLocale,
    interpolation: {
      escapeValue: false, // React already escapes
      prefix: "{",
      suffix: "}",
    },
  })
  .catch((err) => {
    console.error("Failed to initialize i18n:", err);
  });

export default i18n;
