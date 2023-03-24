import { makeStyles } from 'tss-react/mui'

export const useLanguageButtonStyles = makeStyles<{ isRus: boolean }>()(
  (theme, { isRus }) => ({
    language: {
      color: isRus ? theme.palette.primary.dark : theme.palette.secondary.main
    }
  })
)
