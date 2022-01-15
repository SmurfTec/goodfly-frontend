import React, { useContext, useEffect, useMemo } from 'react';
import { Typography, Box, Paper, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AuthContext } from 'Contexts/AuthContext';
import { useTranslation } from 'react-i18next';

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
  ({ tour, travelers, payment, promoDiscount = 0, usePoints }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);
    const { title, price, startingDate } = tour;

    const calculatePrice = () => {
      console.log('calculating price');
      let pointsDiscount = 0;
      let expectedPrice = parseInt(travelers + 1) * parseFloat(price);
      if (usePoints === true) {
        pointsDiscount = user?.loyaltyPoints || 0;
      }
      console.log(`expectedPrice`, expectedPrice);
      console.log(`pointsDiscount`, pointsDiscount);

      let couponDiscount = Math.round((promoDiscount * expectedPrice) / 100);

      let saleDiscount = 0;
      if (tour.sale && new Date(tour.saleExpires) >= new Date())
        saleDiscount = (tour.price * tour.discount) / 100;

      return [
        expectedPrice,
        pointsDiscount,
        couponDiscount,
        parseInt(
          expectedPrice - pointsDiscount - couponDiscount - saleDiscount
        ),
        saleDiscount,
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
          {t('Total')}
        </Typography>
        <Paper elevation={0} sx={{ px: 1, py: 2, backgroundColor: '#fafafa' }}>
          <Box className={classes.box}>
            <span>
              <Typography variant='h5'>{title}</Typography>
              <Typography variant='body1'>
                {startingDate
                  ? new Date(startingDate).toDateString()
                  : t('Open Offer')}
              </Typography>
            </span>
            <Typography variant='subtitle2'>{price} €</Typography>
          </Box>
          <Divider />
          <Box className={classes.box}>
            <span>
              <Typography variant='h5'>
                {+travelers + 1} x {price} €
              </Typography>
              <Typography variant='body1'>
                {t('You and other travellers', { travelers })}
                {/* vous et {+travelers} voyageurs */}
              </Typography>
            </span>
            <Typography variant='subtitle2'>
              {parseInt(+travelers + 1) * parseFloat(price)} €
            </Typography>
          </Box>
          <Divider />
          <Box className={classes.box}>
            <span>
              <Typography variant='h6' fontWeight='normal'>
                {t('Estimasted Total TTC')}
              </Typography>
              {/* <Typography variant='body1'>dont TVA</Typography> */}
            </span>
            <Typography variant='body1'>
              {/* {parseInt(travelers) * parseFloat(price)}€ */}
              {totalPrice[0]} €
            </Typography>
          </Box>
          <Box className={classes.box}>
            <span>
              <Typography variant='h6' fontWeight='normal'>
                {t('Flash Sale Discount')}
              </Typography>
              {/* <Typography variant='body1'>dont TVA</Typography> */}
            </span>
            <Typography variant='body1'>
              {/* {parseInt(travelers) * parseFloat(price)}€ */}
              {totalPrice[4]} €
            </Typography>
          </Box>
          <Box className={classes.box}>
            <span>
              <Typography variant='h6' fontWeight='normal'>
                {t('Loyalty Points Discount')}
              </Typography>
              {/* <Typography variant='body1'>dont TVA</Typography> */}
            </span>
            <Typography variant='body1'>
              {/* {parseInt(travelers) * parseFloat(price)}€ */}
              {totalPrice[1]} €
            </Typography>
          </Box>
          <Box className={classes.box}>
            <span>
              <Typography variant='h6' fontWeight='normal'>
                {t('Coupon Code Discount')}
              </Typography>
              {/* <Typography variant='body1'>dont TVA</Typography> */}
            </span>
            <Typography variant='body1'>
              {/* {parseInt(travelers) * parseFloat(price)}€ */}
              {totalPrice[2]} €
            </Typography>
          </Box>
          <Divider />
          <Box className={classes.box}>
            <span>
              <Typography variant='h4'>{t('Grand Total')}</Typography>
              {/* <Typography variant='body1'>dont TVA</Typography> */}
            </span>
            <Typography variant='h4'>
              {/* {parseInt(travelers) * parseFloat(price)}€ */}
              {totalPrice[3]} €
            </Typography>
          </Box>
        </Paper>
      </>
    );
  }
);
