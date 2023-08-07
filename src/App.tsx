import './App.css'
import RoutersCst from './RoutersCst'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { themeOptions } from './theme/theme';

function App() {

  return (
    <>
      <ThemeProvider theme={themeOptions}>
        <CssBaseline />
        <RoutersCst />
      </ThemeProvider>
    </>
  )
}

export default App
