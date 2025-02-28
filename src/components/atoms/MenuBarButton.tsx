import React from 'react';
import { Button, Avatar, Typography } from '@mui/material';

const MenuBarButton: React.FC<{ 
  id: number, 
  name: string, 
  isActive: boolean, 
  image: string, 
  handleChange: (value: number) => void 
}> = ({ id, name, isActive, image, handleChange }) => {

  return (
    <Button
      onClick={() => handleChange(id)}
      sx={{
        my: 2,
        width: '104px',
        height: '146px',
        display: 'block',
        borderRadius: 0,
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: isActive ? 'primary.main' : 'transparent',
        textTransform: 'capitalize',
        '&:hover': {
          backgroundColor: 'transparent',
          borderBottomColor: 'primary.main',
        }
      }}
    >
      <Avatar src={image} alt={name} sx={{ width: 82, height: 82 }} />
      <Typography align="center" mt={3}>{name}</Typography>
    </Button>
  );
}

export default MenuBarButton;