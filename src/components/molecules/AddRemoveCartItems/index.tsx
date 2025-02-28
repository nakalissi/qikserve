import React from 'react';
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { CartProps } from '../../../interfaces/types.interface';

interface AddRemoveCartItemsProps {
    item: CartProps;
    handleAddItem: (item: CartProps) => void;
    handleRemoveItem: (item: CartProps) => void;
}
const AddRemoveCartItems: React.FC<AddRemoveCartItemsProps> = ({ item, handleAddItem, handleRemoveItem }) => {
  
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <IconButton color="primary" size="small" onClick={() => handleAddItem(item)}>
                <AddCircle fontSize="inherit" />
            </IconButton>
            <Typography sx={{ marginX: 1 }}>{item.quantity}</Typography>
            <IconButton color="primary" aria-label="remove" size="small" onClick={() => handleRemoveItem(item)}>
                <RemoveCircle fontSize="inherit" />
            </IconButton>
        </Box>
    );
}

export default AddRemoveCartItems;