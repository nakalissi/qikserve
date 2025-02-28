import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { removeItem, addItem } from '../../../redux/cart';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { CartProps } from '../../../interfaces/types.interface';
import { RootState } from '../../../redux/store';
import AddRemoveCartItems from '../AddRemoveCartItems';

const Cart: React.FC = () => {
  const { currency } = useSelector((state: RootState) => state.settings.settings);
  const cartTotal: number = useSelector((state: RootState) => state.cart.total);
  const cartItems: CartProps[] = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  
  const handleRemoveItem = (item: CartProps) => {
    dispatch(removeItem(item.id));
  };

  const handleAddItem = (item: CartProps) => {
    dispatch(addItem({
      id: item.id,
      name: item.name,
      quantity: 1,
      price: item.price,
    }));
  };
  
  return (
    <Card sx={{ boxShadow: '0 0 6px rgba(0, 0, 0, 0.1)', mb: 4 }}>
      <CardHeader title="Carrinho" sx={{ backgroundColor: 'background.paper' }}></CardHeader>
      {cartItems.length === 0 ? (
        <Grid spacing={2} p={2}>
          <Typography>Seu carrinho está vazio</Typography>
        </Grid>
      ) : (
        <>
          <Grid container spacing={0} p={2}>
            {cartItems?.map((item: CartProps, index: number) => (
              <Grid container spacing={1} key={index} sx={{ width: '100%', mb: 1 }}>
                <Grid size={6}>
                  <Typography variant="body2" fontWeight="bold">{item.name}</Typography>
                  <Typography variant="body2">{item?.description}</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2" align="right">{currency}{(item.price * item.quantity).toFixed(2)}</Typography>
                </Grid>
                <Grid size={12}>
                  <AddRemoveCartItems item={item} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} />
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={0}>
            <Grid size={12} sx={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: 'background.paper',
              padding: 2,
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              marginBottom: 0,
            }}>
              <Typography fontSize={14}>Sub total</Typography>
              <Typography fontSize={14} align="right">
                {currency}{cartTotal.toFixed(2)}
              </Typography>
            </Grid>
            <Grid size={12} sx={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: 'background.paper',
              padding: 2,
            }}>
              <Typography fontSize={20}>Total:</Typography>
              <Typography fontSize={20} fontWeight="bold" align="right">
                {currency}{cartTotal.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Card>
  );
}

export default Cart;