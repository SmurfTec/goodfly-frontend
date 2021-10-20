import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import StripeInput from './StripeInput';
import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  specialOutline: {
    borderColor: '#000 !important',
    borderWidth: '1px !important',
    borderRadius: 0,
  },
  GridContainer: {
    paddingLeft: '100px',
    paddingTop: '50px',
    minWidth: '500px',
    [theme.breakpoints.down('sm')]: {
      minWidth: 'unset',
      paddingLeft: 'unset',
    },
  },
}));

const PaymentForm = () => {
  const classes = useStyles();

  const stripe = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  return (
    <Elements stripe={stripe}>
      <Grid container spacing={5} className={classes.GridContainer}>
        <Grid item xs={12} sm={12}>
          <TextField
            label='Credit Card Number'
            name='ccnumber'
            variant='outlined'
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardNumberElement,
              },
              classes: { notchedOutline: classes.specialOutline },
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label='Expiration Date'
            name='ccexp'
            variant='outlined'
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardExpiryElement,
              },
              classes: { notchedOutline: classes.specialOutline },
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label='CVC'
            name='cvc'
            variant='outlined'
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardCvcElement,
              },
              classes: { notchedOutline: classes.specialOutline },
            }}
          />
        </Grid>
      </Grid>
    </Elements>
  );
};

export default PaymentForm;
