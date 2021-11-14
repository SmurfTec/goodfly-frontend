import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Stepper,
  Typography,
  Step,
  StepLabel,
  Button,
  Container,
  Grid,
} from '@material-ui/core';
import Step1 from './StepOne';
import Step2 from './StepTwo';
import Step3 from './StepThree';
import { TravelDetails } from './TravelDetails';
import Back from '@material-ui/icons/ArrowBackIos';
import { Box } from '@material-ui/system';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import Page from 'components/common/Page';
import Skeleton from 'react-loading-skeleton';
import { handleCatch, makeReq } from 'Utils/constants';

// const steps = ['Shipping address', 'Payment details'];

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
  return ['Client Reservation', 'Travellers Booking', 'Payment'];
}

const Reservations = () => {
  const { id } = useParams();

  const initialState = {
    reservationType: 'selfReserve',
    firstName: '',
    lastName: '',
    address: '',
    addionalAddress: '',
    postalcode: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    passportNumber: '',
    dateOfBirth: '',
    travellers: [],
    numOfTravellers: 2,
  };
  const [tour, setTour] = useState();
  const [reservation, setReservation] = useState(initialState);
  const [defaultStep2Values, setDefaultStep2Values] = useState();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    //// console.log(`id`, id);

    (async () => {
      try {
        const resData = await makeReq(`/trips/${id}`);
        //// console.log(`resData`, resData);
        setTour(resData.trip);
      } catch (err) {
        handleCatch(err);
      }
    })();
  }, [id]);

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Step1
            changeTravelers={handleChangeTravelers}
            submitForm={handleSubmit1}
            data={reservation}
          />
        );
      case 1:
        return (
          <Step2
            data={reservation}
            submitForm={handleSubmit2}
            defaultStep2Values={defaultStep2Values}
          />
        );
      case 2:
        return (
          <Step3
            data={reservation}
            submitForm={handleSubmit3}
            tour={tour}
            travellers={reservation?.travellers?.length}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  };

  const handleChangeTravelers = (v) => {
    setReservation((st) => ({ ...st, numOfTravellers: v.value }));
  };

  const handleSubmit1 = (data) => {
    handleNext();
    //// console.log(data);
    setReservation((st) => ({
      ...data,
      travellers: st.travellers,
      numOfTravellers: st.numOfTravellers,
    }));
  };

  //*  Handle handleSubmit2 functions
  // * ----------------------------

  const getArrIndex = (key) => {
    let dashIdx = key.indexOf('-');
    return key.slice(dashIdx + 1, dashIdx + 2) * 1 - 1;
  };

  const getProperKey = (key) => {
    let properKey = key.indexOf('-');
    return key.slice(0, properKey);
  };

  const handleSubmit2 = (data) => {
    //// console.log(data);
    setDefaultStep2Values(data);
    // * Extract Travellers from Object and Move into Reservation State

    let newTravelers = [];

    for (var key in data) {
      const keyIdx = getArrIndex(key);
      //console.log({ keyIdx });
      const properKey = getProperKey(key);
      //console.log(`properKey`, properKey);
      if (data.hasOwnProperty(key)) {
        // * Get array index
        newTravelers[keyIdx] = {
          ...newTravelers[keyIdx],
          [properKey]: data[key],
        };
      }
    }

    // * if properKey is 'email' && emailRadio is same, then email  is data.email
    newTravelers = newTravelers.map((traveler) => ({
      ...traveler,
      email:
        traveler.emailRadio === 'same' ? reservation.email : traveler.email,
    }));

    // * Remove Irrelevant field from Array
    newTravelers.forEach((traveler) => {
      delete traveler.emailRadio;
    });

    //console.log({ newTravelers });

    handleNext();
    setReservation((st) => ({ ...st, ...data, travellers: newTravelers }));
  };
  // * -----------------------------

  // * Handle Submit of Step 3
  const handleSubmit3 = (data) => {
    //console.log(`data`, data);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleMoveBack = () => {
    if (activeStep === 0) {
      // history.goBack();
      //// console.log(`location.pathname`, location.pathname);
      // * We have to go to /tours from /tours/reservations/213c
      //  * "" , "tours" , "resevations" , "213c"
      const [, , , tourId] = location.pathname.split('/');

      history.push(`/tours/details/${tourId}`);
    } else {
      handleBack();
    }
  };

  const renderBackTitle = () => {
    //console.log('Gooo');
    //console.log(`activeStep`, activeStep);
    switch (activeStep) {
      case 0:
        return <Typography variant='subtitle2'>Back to Offers Page</Typography>;

      case 1:
        return (
          <Typography variant='subtitle2'>
            Back to Client Reservation{' '}
          </Typography>
        );

      case 2:
        return (
          <Typography variant='subtitle2'>
            Back to Travellers Booking{' '}
          </Typography>
        );

      default:
        return <Typography variant='subtitle2'>Back to Offers Page</Typography>;
    }
  };

  return (
    <Page title='GoodFly | Trip Reservation'>
      <Container sx={{ mb: 4, mt: 7 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography>All steps completed</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <>
              <Container>
                <Box className={classes.backButton} onClick={handleMoveBack}>
                  <Back fontSize='small' /> {renderBackTitle()}
                </Box>
              </Container>
              <Grid container spacing={2} sx={{ mt: 6 }}>
                <Grid item xs={12} sm={activeStep === 0 ? 8 : 12}>
                  {getStepContent(activeStep)}
                </Grid>
                {/* // {(activeStep === 0 || activeStep === 2) && ( */}
                {activeStep === 0 && (
                  <Grid item xs={12} sm={4}>
                    {tour ? (
                      <TravelDetails
                        tour={tour}
                        travellers={reservation.travellers.length}
                      />
                    ) : (
                      <Skeleton height={250} />
                    )}
                    <Button
                      form='form1'
                      variant='contained'
                      color='primary'
                      type='submit'
                      sx={{ mt: 3 }}
                      fullWidth
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </>
          )}
        </div>
      </Container>
    </Page>
  );
};

export default Reservations;
