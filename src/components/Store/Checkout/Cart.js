import { Divider, Grid, Paper, Typography, Box } from '@material-ui/core';
import React from 'react';
import CartItem from './CartItem';
import { styles } from 'Styles/Cart/CartItemStyles';
import TotalBill from './TotalBill';
import Back from '@material-ui/icons/ArrowBackIos';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Cart = ({
  validateStep,
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
}) => {
  const classes = styles();
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={12} md={7}>
          <Box display='flex' onClick={() => history.push('/store')}>
            <Back fontSize='small' />
            <Typography variant='subtitle2'>{`${t('Back to')} ${t(
              'Store'
            )}`}</Typography>
          </Box>
          <Typography variant='h4' sx={{ mt: 8 }}>
            {t('Your Basket')}
          </Typography>
          <Paper elevation={0} sx={{ backgroundColor: '#fafafa', p: 2, mt: 3 }}>
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
              {cart.orderItems.length > 0 && (
                <>
                  <Typography
                    variant='subtitle1'
                    className={classes.descriptionHeader}
                  >
                    {t('Product')}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    className={classes.quantityHeader}
                  >
                    {t('Quantity')}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    align='right'
                    className={classes.priceHeader}
                  >
                    {t('Price')}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    align='right'
                    className={classes.priceHeader}
                  >
                    {t('Sub-total')}
                  </Typography>
                </>
              )}
            </Box>
            {cart.orderItems.length > 0 ? (
              cart.orderItems.map((product, i) => {
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
                {t('You Have NO Products on the cart')}
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <TotalBill validateForm={validateStep} cart={cart} />
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
