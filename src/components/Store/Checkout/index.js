import { Container, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import React, { useContext, useEffect, useState } from 'react';
import Cart from './Cart';
import Step2 from './Step2';
import Step3 from './Step3';
import Back from '@material-ui/icons/ArrowBackIos';
import { useHistory, useLocation } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';

import { makeStyles } from '@material-ui/styles';
import { StoreContext } from 'Contexts/StoreContext';
import { AuthContext } from 'Contexts/AuthContext';
import Page from 'components/common/Page';
import { handleCatch, makeReq } from 'Utils/constants';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme) => ({
  backButton: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginTop: theme.spacing(11),
    marginBottom: theme.spacing(2),

    '&:hover': {
      '& svg': {
        transform: 'translateX(-3px)',
      },
    },
    '& svg': {
      fontSize: '1rem',
    },
    cursor: 'pointer',
  },
}));

function getSteps() {
  return ['Checkout', 'Basket', 'Travellers Booking', 'Payment'];
}

const Checkout = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
    order,
    setOrder,
    resetCart,
    payOrder,
    setUserOrders,
  } = useContext(StoreContext);
  const { user } = useContext(AuthContext);

  const query = new URLSearchParams(location.search).get('step');

  const [activeStep, setActiveStep] = useState(-1);
  const steps = getSteps();

  const [state, setState] = useState({
    orderItems: [],
    subTotal: 0,
    total: 0,
    deliveryMethod: '',
    deliveryAddress: '',
    shippingAddress: {
      address: '',
      city: '',
      country: '',
      postalCode: '',
    },
  });

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Cart
            validateStep={validateStep1}
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeItemFromCart={removeItemFromCart}
          />
        );
      case 1:
        return (
          <Step2
            validateStep={validateStep2}
            cart={cart}
            changeDeliveryMethod={(val) =>
              setState((st) => ({ ...st, deliveryMethod: val }))
            }
          />
        );
      case 2:
        return (
          <Step3
            validateStep={validateStep3}
            cart={cart}
            deliveryMethod={state.deliveryMethod}
            loyaltyPoints={user?.loyaltyPoints || 0}
          />
        );

      case 3:
        return (
          order && (
            <PayPalButton
              amount={order.total}
              options={{
                clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
                disableFunding: 'credit',
                currency: 'EUR',
              }}
              onSuccess={async (details, data) => {
                payOrder(order._id, '/store');
              }}
            />
          )
        );

      default:
        return <div className='loader'></div>;
    }
  };

  useEffect(() => {
    if (!order) {
      setActiveStep(0);
    } else {
      setActiveStep(3);
    }
  }, [order]);

  useEffect(() => {
    if (!user) setActiveStep(0);
  }, [user]);
  const validateStep1 = () => {
    console.log('validated step 1');
    // * If user if NOT Logged in , move her to Login page
    if (!user) history.push('/auth/login?redirect=/store/cart');
    else handleNext();
  };
  const validateStep2 = (data) => {
    console.log('validated step 2', data);
    let newState = {
      deliveryMethod: data.deliveryMethod,
      shippingAddress: {
        address: data.address,
        city: data.city,
        country: data.country,
        postalCode: data.postalCode,
      },
    };
    console.log(`newState`, newState);
    setState(newState);
    handleNext();
  };
  const validateStep3 = async (data) => {
    const orderItems = cart.orderItems.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));

    const newState = {
      ...state,
      ...data,
      orderItems,
    };

    // * Create Order
    try {
      const resData = await makeReq(
        `/orders`,
        { body: { ...newState } },
        'POST'
      );
      console.log(`resData`, resData);
      setActiveStep(3);
      // * Clear Cart
      resetCart();
      setOrder(resData.order);
      setUserOrders(resData.userOrders);
    } catch (err) {
      handleCatch(err);
    }
    // handleNext();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const { t } = useTranslation();

  return (
    <Page title={`GoodFly |  ${t('Checkout')}`}>
      <Container sx={{ mt: 8, mb: 2 }}>
        {activeStep > 0 && activeStep < 3 && (
          <>
            <Box className={classes.backButton} onClick={handleBack}>
              <Back fontSize='small' />
              <Typography variant='subtitle2'>
                {t('Back to')} {t(steps[activeStep])}
              </Typography>
            </Box>
          </>
        )}

        {getStepContent(activeStep)}
      </Container>
    </Page>
  );
};

export default Checkout;
