import { createContext, useContext } from "react";
import { TranslationContext as TranslationContextType } from "./Translation.types";

const LanguageContext = createContext<TranslationContextType>(
  {} as TranslationContextType
);

const useLanguage = () => useContext(LanguageContext);

export { useLanguage, LanguageContext };
