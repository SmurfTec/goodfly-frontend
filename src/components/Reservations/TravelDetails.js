import React, { useContext, useEffect, useMemo } from 'react';
import { Typography, Box, Paper, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AuthContext } from 'Contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    width: '100% ',
    justifyContent: 'space-between',
    paddingInline: theme.spacing(2),
    paddingBlock: 10,
  },
}));

export const TravelDetails = React.memo(
  ({ tour, travelers, payment, promoDiscount = 0 }) => {
    const classes = useStyles();
    const { user } = useContext(AuthContext);
    const { title, price, startingDate } = tour;

    const calculatePrice = () => {
      console.log('calculating price');
      let pointsDiscount = 0;
      let expectedPrice = parseInt(travelers + 1) * parseFloat(price);
      if (payment == 'loyalty-points') {
        pointsDiscount = user?.loyaltyPoints || 0;
      }
      console.log(`expectedPrice`, expectedPrice);
      console.log(`pointsDiscount`, pointsDiscount);

      let couponDiscount = Math.round((promoDiscount * expectedPrice) / 100);

      return [
        expectedPrice,
        pointsDiscount,
        couponDiscount,
        expectedPrice - pointsDiscount - couponDiscount,
      ];
    };

    const totalPrice = useMemo(
      () => calculatePrice(),
      [price, travelers, payment, promoDiscount]
    );
    // calculatePrice();

    return (
      <>
        <Typography variant='h4' sx={{ mb: 4.5 }}>
          Total
        </Typography>
        <Paper elevation={0} sx={{ px: 1, py: 2, backgroundColor: '#fafafa' }}>
          <Box className={classes.box}>
            <span>
              <Typography variant='h5'>{title}</Typography>
              <Typography variant='body1'>
                {startingDate
                  ? new Date(startingDate).toDateString()
                  : 'Open Offer'}
              </Typography>
            </span>
            <Typography variant='subtitle2'>{price}</Typography>
          </Box>
          <Divider />
          <Box className={classes.box}>
            <span>
              <Typography variant='h5'>
                {+travelers + 1} x {price}
              </Typography>
              <Typography variant='body1'>
                vous et {+travelers} voyageurs
              </Typography>
            </span>
            <Typography variant='subtitle2'>
              {parseInt(+travelers + 1) * parseFloat(price)}€
            </Typography>
          </Box>
          <Divider />
          <Box className={classes.box}>
            <span>
              <Typography variant='h6' fontWeight='normal'>
                Estimasted Total TTC
              </Typography>
              {/* <Typography variant='body1'>dont TVA</Typography> */}
            </span>
            <Typography variant='body1'>
              {/* {parseInt(travelers) * parseFloat(price)}€ */}
              {totalPrice[0]}$
            </Typography>
          </Box>
          <Box className={classes.box}>
            <span>
              <Typography variant='h6' fontWeight='normal'>
                Loyalty Points Discount
              </Typography>
              {/* <Typography variant='body1'>dont TVA</Typography> */}
            </span>
            <Typography variant='body1'>
              {/* {parseInt(travelers) * parseFloat(price)}€ */}
              {totalPrice[1]}$
            </Typography>
          </Box>
          <Box className={classes.box}>
            <span>
              <Typography variant='h6' fontWeight='normal'>
                Coupon Code Discount
              </Typography>
              {/* <Typography variant='body1'>dont TVA</Typography> */}
            </span>
            <Typography variant='body1'>
              {/* {parseInt(travelers) * parseFloat(price)}€ */}
              {totalPrice[2]}$
            </Typography>
          </Box>
          <Divider />
          <Box className={classes.box}>
            <span>
              <Typography variant='h4'>Grand Total</Typography>
              {/* <Typography variant='body1'>dont TVA</Typography> */}
            </span>
            <Typography variant='h4'>
              {/* {parseInt(travelers) * parseFloat(price)}€ */}
              {totalPrice[3]}$
            </Typography>
          </Box>
        </Paper>
      </>
    );
  }
);
