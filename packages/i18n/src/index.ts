import enAuth from "./locales/en/auth.json";
import enCommon from "./locales/en/common.json";
import enNavigation from "./locales/en/navigation.json";
import enPost from "./locales/en/post.json";
import trAuth from "./locales/tr/auth.json";
import trCommon from "./locales/tr/common.json";
import trNavigation from "./locales/tr/navigation.json";
import trPost from "./locales/tr/post.json";

// Export locales configuration
export const defaultLocale = "en" as const;
export const locales = ["en", "tr"] as const;
export type Locale = (typeof locales)[number];

// Export translation namespaces
export const namespaces = ["auth", "common", "navigation", "post"] as const;
export type Namespace = (typeof namespaces)[number];

// Export messages for Next.js (flat structure)
export const messages = {
  en: {
    auth: enAuth,
    common: enCommon,
    navigation: enNavigation,
    post: enPost,
  },
  tr: {
    auth: trAuth,
    common: trCommon,
    navigation: trNavigation,
    post: trPost,
  },
} as const;

// Export resources for Expo/react-i18next (nested structure)
export const resources = {
  en: {
    auth: enAuth,
    common: enCommon,
    navigation: enNavigation,
    post: enPost,
  },
  tr: {
    auth: trAuth,
    common: trCommon,
    navigation: trNavigation,
    post: trPost,
  },
} as const;

// Export types
export * from "./types";
