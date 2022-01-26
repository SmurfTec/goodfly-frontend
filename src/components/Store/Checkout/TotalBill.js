import React, { useMemo } from 'react';
import { Typography, Button, Box, Paper, Divider } from '@material-ui/core';
import { makeReq } from 'Utils/constants';
import { useTranslation } from 'react-i18next';

const BillingRow = ({ slug, amount }) => (
  <Box
    sx={{
      mx: 2,
      display: 'flex',
      columnGap: 2,
      justifyContent: 'space-between',
    }}
  >
    <Typography variant='h5' color='textSecondary'>
      {slug}
    </Typography>
    <Typography variant='h5' color='textSecondary'>
      {amount || 0} €
    </Typography>
  </Box>
);

const TotalBill = ({
  validateForm,
  formName,
  cart,
  paymentOption,
  deliveryMethod,
  loyaltyPoints,
  promoDiscount,
  isSubmitting,
  usePoints,
  relayPoint,
  finalStep,
}) => {
  const deliveryPrice = useMemo(() => {
    let amount = 0;

    if (deliveryMethod === 'relay-point') amount += 240;
    else if (deliveryMethod === 'home-delivery') amount += 540;

    return amount;
  }, [deliveryMethod]);

  const totalPrice = useMemo(() => {
    let amount = cart.total;
    amount += +deliveryPrice || 0;

    console.log(`amount`, amount);

    // if (paymentOption === 'points') {
    if (usePoints === true) {
      let loyaltyDiscount = loyaltyPoints;
      if (loyaltyDiscount > cart.total) loyaltyDiscount = cart.total;
      amount -= loyaltyDiscount;
    }

    amount -= (amount * +promoDiscount || 0) / 100;

    console.log(`amount`, amount);

    return amount;
  }, [
    paymentOption,
    cart.total,
    promoDiscount,
    deliveryPrice,
    loyaltyPoints,
    usePoints,
  ]);

  const { t } = useTranslation();
  return (
    <>
      <Typography variant='h4' sx={{ mt: 8 }}>
        {t('Basket total')}
      </Typography>
      <Paper elevation={0} sx={{ backgroundColor: '#fafafa', p: 2, mt: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mx: 5,
            my: 3,
          }}
        >
          <BillingRow slug={t('Subtotal')} amount={cart.subTotal} />
          <BillingRow slug={t('Delivery Charges')} amount={deliveryPrice} />

          <Divider sx={{ my: 3, mx: -3 }} />

          <BillingRow
            slug={t('LoyaltyPoints Discount')}
            amount={
              usePoints === true
                ? loyaltyPoints > cart.subTotal
                  ? cart.subTotal
                  : loyaltyPoints
                : 0
            }
          />
          <BillingRow
            slug={t('PromoCode Discount')}
            amount={((cart.total + deliveryPrice) * promoDiscount) / 100}
          />

          <Divider sx={{ my: 3, mx: -3 }} />
          <Box
            sx={{
              mx: 2,
              display: 'flex',
              columnGap: 2,
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h4' color='textSecondary'>
              {t('Total')}
            </Typography>
            <Typography variant='h4' color='textSecondary'>
              {/* {cart.total + deliveryPrice} € */}
              {totalPrice} €
            </Typography>
          </Box>
        </Box>
      </Paper>

      {!formName ? (
        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 3, minHeight: 70, fontSize: 20 }}
          fullWidth
          onClick={validateForm}
          disabled={cart.orderItems.length === 0 || isSubmitting}
        >
          {t('VALIDATE THE ORDER')}
        </Button>
      ) : (
        <Button
          type='submit'
          form={formName}
          variant='contained'
          color='primary'
          sx={{ mt: 3, minHeight: 70, fontSize: 20 }}
          fullWidth
          disabled={
            !formName ||
            (deliveryMethod === 'relay-point' && !relayPoint && !finalStep)
          }
        >
          {t('VALIDATE THE ORDER')}
        </Button>
      )}
    </>
  );
};

export default TotalBill;
