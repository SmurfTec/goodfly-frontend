import React, { useState } from 'react';
import { styles } from 'Styles/Cart/CartItemStyles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {
  Card,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from '@material-ui/core';
import Addrounded from '@material-ui/icons/AddRounded';
import RemoveRounded from '@material-ui/icons/RemoveRounded';

import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
function ShoppingCartItem({
  product,
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
}) {
  const classes = styles();
  const { images, price, _id, name, category, quantity, subTotal } = product;

  return (
    <div className={classes.item}>
      <IconButton
        sx={{ mx: 1 }}
        onClick={removeItemFromCart.bind(this, _id)}
        size='small'
        data-productid={_id}
      >
        <RemoveShoppingCartIcon fontSize='small' />
      </IconButton>

      <Card sx={{ boxShadow: 'none' }}>
        <CardMedia
          sx={{ height: 50, position: 'relative', width: 50 }}
          image={images[0].url}
          title={name}
        />
      </Card>

      <Box className={classes.description}>
        <Typography
          variant='subtitle1'
          color='textSecondary'
          sx={{ textTransform: 'capitalize' }}
        >
          {name}
        </Typography>
      </Box>

      <Box className={classes.quantity}>
        <IconButton
          sx={{ border: '1px solid #9f9f9f' }}
          color='primary'
          disabled={quantity <= 1}
          onClick={decreaseQuantity.bind(this, _id)}
          size='small'
        >
          <RemoveRounded fontSize='small' />
        </IconButton>
        <Typography
          variant='subtitle1'
          color='textSecondary'
          sx={{ userSelect: 'none', mx: 1 }}
        >
          {quantity}
        </Typography>
        <IconButton
          sx={{ border: '1px solid #9f9f9f' }}
          color='primary'
          disabled={quantity >= 10}
          onClick={increaseQuantity.bind(this, _id)}
          size='small'
        >
          <Addrounded fontSize='small' />
        </IconButton>
      </Box>
      <Typography
        variant='subtitle1'
        color='textSecondary'
        fullWidth
        className={classes.totalPrice}
        align='right'
      >
        {price} €
      </Typography>
      <Typography
        variant='subtitle1'
        color='textSecondary'
        className={classes.totalPrice}
        align='right'
      >
        {subTotal}€
      </Typography>
    </div>
  );
}

export default ShoppingCartItem;
