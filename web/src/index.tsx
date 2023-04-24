// import 'react-hot-loader'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { globalBaseStyles } from 'styles'
import { CssBaseline, ThemeProvider as MUIThemeProvider } from '@mui/material'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import TranslationProvider from 'context/Translation/TranslationProvider'
import MenuProvider from 'context/MenuState/MenuProvider'
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <StrictMode>
    <ThemeProvider theme={globalBaseStyles}>
      <MUIThemeProvider theme={globalBaseStyles}>
        <Router>
          <CssBaseline />
          <TranslationProvider>
            <MenuProvider>
              <App />
            </MenuProvider>
          </TranslationProvider>
        </Router>
      </MUIThemeProvider>
    </ThemeProvider>
  // </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
