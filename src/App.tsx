import React, { useState, useEffect } from 'react';
import { Theme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Routes from './routes';
import createDynamicTheme from './theme';
import { fetchRestaurantDetails } from './services/api';
import { setup } from './redux/settings';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState<Theme>({} as Theme);

  useEffect(() => {
    const loadTheme = async () => {
      const data = await fetchRestaurantDetails();
      const dynamicTheme = createDynamicTheme(data);
      setTheme(dynamicTheme);
      dispatch(setup(data));
    };
    loadTheme();
  }, []);

  if (!theme) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
};

export default App;
