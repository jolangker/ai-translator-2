export interface TranslationPayload {
  text: string;
  targetLanguage: string;
}

// The API returns just the translated text
export type TranslationResult = string;