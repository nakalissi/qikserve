import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Cancel } from '@mui/icons-material';
import { ItemProps, ModifiersProps } from '../../interfaces/types.interface';
import { addItem } from '../../redux/cart';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { FormControl, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const CustomizedDialog: React.FC<{ 
  isOpen: boolean, 
  content: ItemProps | null, 
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void,
}> = ({ 
  isOpen, 
  content, 
  handleClose,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleAddItem = (item: ItemProps) => {
    
    const modifierItem = item.modifiers?.flatMap((modifier: ModifiersProps) => 
      modifier.items.filter((item: { id: string }) => item.id.toString() === value)
    )[0];
    
    dispatch(addItem({
      id: item.id,
      name: item.name,
      quantity: 1,
      price: modifierItem ? modifierItem.price : item.price,
      description: modifierItem ? modifierItem.name : '',
    }));

    handleClose({} as React.MouseEvent<HTMLButtonElement>);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (!isOpen) {
      setValue('');
    }
  }, [isOpen]);

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        {!content ? <CircularProgress />
        : (
          <Card sx={{ width: '480px', maxWidth: '100%', boxShadow: 'none' }}>
            {content.images && content.images.length && 
              <CardMedia
                sx={{ height: 140 }}
                image={content.images[0].image}
                title={content.name}
              />
            }
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={() => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'background.paper',
              })}
            >
              <Cancel />
            </IconButton>
            <CardContent>
              <Typography fontWeight="bold" fontSize={20}>
                {content.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {content.description}
              </Typography>
              {content?.modifiers && content?.modifiers.map((modifier: ModifiersProps, index: number) => (
                <React.Fragment key={index}>
                  <Box sx={{ backgroundColor: 'background.default', padding: 2, borderRadius: 3, my: 2 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {modifier.name}
                    </Typography>
                    <Typography variant="body2">
                      Select {modifier.minChoices} option
                    </Typography>
                  </Box>
                  <FormControl fullWidth>
                    <RadioGroup
                      name="controlled-radio-buttons-group"
                      onChange={handleChange}
                      defaultValue={value}
                    >
                      {Array.isArray(modifier.items) && modifier.items.map((item: { id: string; name: string; price: number }, index: number) => (
                        <FormControlLabel key={index} value={item.id} sx={{ ml: 0, display: 'flex', justifyContent: 'space-between' }} control={<Radio size="small" />} label={item.name} labelPlacement="start" />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  
                </React.Fragment>
              ))}
            </CardContent>
            <CardActions>
              <Button color="primary" variant="contained" 
                sx={{ borderRadius: 6, mt: 2 }} fullWidth 
                onClick={() => handleAddItem(content)}
              >
                Add to Order • {content.price.toFixed(2)}
              </Button>
            </CardActions>
          </Card>
        )}
      </BootstrapDialog>
    </>
  );
}

export default CustomizedDialog;