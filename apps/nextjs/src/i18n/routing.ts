import { defineRouting } from "next-intl/routing";

import { defaultLocale, locales } from "@acme/i18n";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Hide locale prefix for default language (tr)
  localePrefix: "as-needed",
});
