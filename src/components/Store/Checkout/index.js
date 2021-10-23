import { Container, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import React, { useContext, useState } from 'react';
import Cart from './Cart';
import Step2 from './Step2';
import Step3 from './Step3';
import StoreNav from '../StoreSubNav';
import Back from '@material-ui/icons/ArrowBackIos';

import { makeStyles } from '@material-ui/styles';
import { StoreContext } from 'Contexts/StoreContext';
import Page from 'components/common/Page';

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
  const { cart, increaseQuantity, decreaseQuantity, removeItemFromCart } =
    useContext(StoreContext);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

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
        return <Step2 validateStep={validateStep2} cart={cart} />;
      case 2:
        return <Step3 validateStep={validateStep3} cart={cart} />;

      default:
        return 'Unknown stepIndex';
    }
  };

  const validateStep1 = () => {
    console.log('validated step 1');
    handleNext();
  };
  const validateStep2 = (data) => {
    console.log('validated step 2', data);
    handleNext();
  };
  const validateStep3 = (data) => {
    console.log('validated step 2', data);
    handleNext();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Page title='GoodFly |  Checkout'>
      <Container sx={{ mt: 8 }}>
        <StoreNav />

        {activeStep > 0 && (
          <>
            <Box className={classes.backButton} onClick={handleBack}>
              <Back fontSize='small' />
              <Typography variant='subtitle2'>
                Back to {steps[activeStep]}
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
