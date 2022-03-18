import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ViewportProvider } from './contexts/ViewportContext';
import Header from './components/Header';
import Main from './components/Main';

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ViewportProvider>
        <Header />
        <Main />
      </ViewportProvider>
    </ThemeProvider>
  );
}
