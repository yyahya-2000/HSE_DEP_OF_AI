import { FC, useState } from 'react'
import { LanguageContext } from 'context/Translation'
import i18n from 'i18n'
import { ChildrenProps } from 'types'

const TranslationProvider: FC<ChildrenProps> = ({ children }) => { 
  const startLanguage = window.navigator.language.includes("ru") ? 'ru' : 'en'
  const [language, setLanguage] = useState(startLanguage)

    const isRus = language.includes("ru") ? true : false

    const changeLanguage = (newLanguage) => {
      setLanguage(newLanguage)
      i18n.changeLanguage(newLanguage)
    }
  return (
    <LanguageContext.Provider
      value={{
        language,
        isRus,
        changeLanguage
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export default TranslationProvider
