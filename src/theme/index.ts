import { createTheme, Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    banner: {
      image: string;
    };
  }
  interface ThemeOptions {
    banner?: {
      image?: string;
    };
  }
}

const createDynamicTheme = (theme: any): Theme => {
  return createTheme({
    palette: {
      primary: {
        main: theme?.webSettings?.primaryColour || '#4F372F',
      },
      secondary: {
        light: '#F8F9FA',
        main: theme?.webSettings?.backgroundColour || '#ffffff',
      },
      background: {
        paper: '#F8F9FA',
        default: '#EEEEEE',
      },
    },
    banner: {
      image: theme?.webSettings?.bannerImage,
    },
    typography: {
      allVariants: {
        fontFamily: [
          'Roboto',
          'sans-serif',
        ].join(','),
        color: '#464646',
      },
    },
  });
};

export default createDynamicTheme;
