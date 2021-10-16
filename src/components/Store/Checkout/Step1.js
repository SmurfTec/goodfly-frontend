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

const products = [
  {
    images: [{ url: LoyaltyImg }],
    price: 200,
    countInStock: 10,
    reviews: [],
    rating: 0,
    numReviews: 0,
    _id: '615a1ab8957a8e342485d89b',
    name: 'jeans',
    category: 'men',
    description: ' pants for men ',
    __v: 0,
  },
  {
    images: [{ url: LoyaltyImg }],
    price: 200,
    countInStock: 10,
    reviews: [],
    rating: 0,
    numReviews: 0,
    _id: '615a1ab8957a8e342485d89b',
    name: 'Dawn Bread By pakistan - Big Pack',
    category: 'men',
    description: ' pants for men ',
    __v: 0,
  },
];

const Step1 = ({ validateStep1 }) => {
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
            {products.map((product, i) => {
              return (
                <>
                  <CartItem key={product.id} product={product} />
                  {i < products.length - 1 && <Divider />}
                </>
              );
            })}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <TotalBill validateForm={validateStep1} />
        </Grid>
      </Grid>
    </>
  );
};

export default Step1;
