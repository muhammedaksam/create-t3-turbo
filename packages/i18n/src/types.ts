// Shared types for i18n hooks
export type { Locale, Namespace } from "./index";

// Re-export translation keys for type safety
export interface TranslationKeys {
  common: Record<string, string>;
  auth: Record<string, string>;
}
