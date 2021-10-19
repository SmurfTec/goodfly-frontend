import {
  Divider,
  Grid,
  Paper,
  Typography,
  Box,
} from '@material-ui/core';
import React from 'react';
import StoreNav from '../StoreSubNav';
import CartItem from './CartItem';
import LoyaltyImg from 'Assets/img/loyaltyCard.jpg';
import { styles } from 'Styles/Cart/CartItemStyles';
import TotalBill from './TotalBill';

const Cart = ({
  validateStep1,
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
}) => {
  const classes = styles();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <Typography variant='h4' sx={{ mt: 8 }}>
            Your Basket
          </Typography>
          <Paper
            elevation={0}
            sx={{ backgroundColor: '#fafafa', p: 2, mt: 3 }}
          >
            <Box
              sx={{
                my: 2,
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                rowGap: 2,
                columnGap: 1,
              }}
            >
              <Typography
                variant='subtitle1'
                className={classes.descriptionHeader}
              >
                Product
              </Typography>
              <Typography
                variant='subtitle1'
                className={classes.quantityHeader}
              >
                Quantity
              </Typography>
              <Typography
                variant='subtitle1'
                align='right'
                className={classes.priceHeader}
              >
                Price
              </Typography>
              <Typography
                variant='subtitle1'
                align='right'
                className={classes.priceHeader}
              >
                Sub-total
              </Typography>
            </Box>
            {cart ? (
              cart.map((product, i) => {
                return (
                  <>
                    <CartItem
                      key={product.id}
                      product={product}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                      removeItemFromCart={removeItemFromCart}
                    />
                    {i < cart.length - 1 && <Divider />}
                  </>
                );
              })
            ) : (
              <Typography variant='h5'>
                You Have to Products on the cart
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <TotalBill validateForm={validateStep1} />
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
