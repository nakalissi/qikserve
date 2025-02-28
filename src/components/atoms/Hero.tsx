import React from 'react';
import Box from "@mui/material/Box";
import { useTheme } from '@mui/material/styles';

const Hero: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{
        width: '100%',
        height: '150px',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.primary.main,
        backgroundImage: `url(${theme?.banner?.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      { children }
    </Box>
  );
}

export default Hero;