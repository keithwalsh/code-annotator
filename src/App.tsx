import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import CodeEditor from './components/CodeEditor';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <CodeEditor />
    </ThemeProvider>
  );
}

export default App;
