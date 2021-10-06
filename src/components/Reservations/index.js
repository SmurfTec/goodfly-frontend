import React from 'react';
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
import { useHistory } from 'react-router-dom';

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
  const packageInfo = { name: 'Hajj 2021', price: '4525,00€' };
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);
  const [noOfTravellers, setnoOfTravellers] = React.useState(1);
  const steps = getSteps();
  const history = useHistory();

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Step1
            travellersInfo={TravellersSelected}
            clientForm={clientForm}
          />
        );
      case 1:
        return (
          <Step2
            travellers={noOfTravellers}
            travellersForm={travellersInfo}
          />
        );
      case 2:
        return <Step3 />;
      default:
        return 'Unknown stepIndex';
    }
  };

  const clientForm = (data) => {
    // console.log(data);
    handleNext();
  };

  const travellersInfo = (data) => {
    // console.log(data);
    handleNext();
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

  const TravellersSelected = (v) => {
    setnoOfTravellers(v.value);
  };

  const handleMoveBack = () => {
    if (activeStep === 0) {
      history.push('/tours/destinations');
    } else {
      handleBack();
    }
  };

  return (
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
              <Box
                className={classes.backButton}
                onClick={handleMoveBack}
              >
                <Back fontSize='small' />{' '}
                {activeStep === 0 ? (
                  <Typography variant='subtitle2'>
                    Back to Offers Page
                  </Typography>
                ) : (
                  <Typography variant='subtitle2'>
                    Back to {steps[activeStep]}
                  </Typography>
                )}
              </Box>
            </Container>
            <Grid container spacing={2} sx={{ mt: 6 }}>
              <Grid
                item
                xs={12}
                sm={activeStep === 0 || activeStep === 2 ? 8 : 12}
              >
                {getStepContent(activeStep)}
              </Grid>
              {(activeStep === 0 || activeStep === 2) && (
                <Grid item xs={12} sm={4}>
                  <TravelDetails
                    packageName={packageInfo.name}
                    price={packageInfo.price}
                    depDate='11-11-2211'
                    travellers={noOfTravellers}
                  />
                  <Button
                    form='form1'
                    variant='contained'
                    color='primary'
                    type='submit'
                    sx={{ mt: 3 }}
                    fullWidth
                  >
                    {activeStep === steps.length - 1
                      ? 'Finish'
                      : 'Next'}
                  </Button>
                </Grid>
              )}
            </Grid>
          </>

          /* <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div> */
        )}
      </div>
    </Container>
  );
};

export default Reservations;
