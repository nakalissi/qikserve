import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
  </ThemeProvider>
);

export default App;
