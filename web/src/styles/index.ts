import { createTheme, colors } from '@mui/material'

export const globalBaseStyles = createTheme({
  palette: {
    primary: {
      light: '#EDEDFA',
      main: '#4E51EB',
      dark: '#5F52FA'
    },
    secondary: {
      light: colors.pink[50],
      main: colors.pink['A400'],
      dark: colors.pink['A700']
    }
  }
})
