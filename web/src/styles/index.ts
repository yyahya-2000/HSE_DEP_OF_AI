import { createTheme, colors } from '@mui/material'

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobileVertical: true;
    mobileHorisontal: true;
    tablet: true;
    tabletVertical: true;
    tabletHorisontal: true;
    laptop: true;
    desktop: true;
  }
}

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
    },
    success: {
      main: "#57AB27",
    },
    text: {
      primary: "#4A4646",
      secondary: "#696A6D",
    },
    grey: {
      50: "#F0F2F4",
      100: "#D1D3D5",
    },
  },
  breakpoints: {
    values: {
      mobileVertical: 320,
      mobileHorisontal: 480,
      tablet: 600,
      tabletVertical: 768,
      tabletHorisontal: 1024,
      laptop: 1280,
      desktop: 1440,
    },
  }
})
