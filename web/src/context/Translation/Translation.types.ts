export type TranslationContext = {
  language: string;
  isRus: boolean;
  changeLanguage: (language: string) => void;
};