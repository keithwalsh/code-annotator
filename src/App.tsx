import { ThemeProvider, createTheme, CssBaseline, Box, FormControlLabel, Switch } from '@mui/material';
import CodeEditor from './components/CodeEditor';
import React, { useState, useMemo, useCallback } from 'react';

// App component now manages theme mode state and provides toggle switch

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const handleThemeToggle = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <FormControlLabel
          control={<Switch checked={mode === 'dark'} onChange={handleThemeToggle} />}
          label="Dark Mode"
        />
      </Box>
      <CodeEditor />
    </ThemeProvider>
  );
}

export default App;
