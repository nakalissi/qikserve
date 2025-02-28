import React from 'react';
import Box from "@mui/material/Box";
import { useTheme } from '@mui/material/styles';
import BackgroundImage from '../../assets/images/header.jpg';

const Hero: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{
        width: '100%',
        height: '150px',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.primary.main,
        backgroundImage: `url(${theme?.banner?.image || BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      { children }
    </Box>
  );
}

export default Hero;