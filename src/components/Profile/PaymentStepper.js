import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 43,
    left: 'calc(-50% + 10px)',
    right: 'calc(50% + 11px)',
  },
  active: {
    '& $line': {
      borderColor: '#B3B3B3',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#B3B3B3',
    },
  },
  line: {
    borderColor: '#B3B3B3',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles((theme) => ({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    marginTop: 10,
  },
  active: {
    color: theme.palette.primary.main,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    border: `2px solid ${theme.palette.primary.main}`,
  },
  completed: {
    color: theme.palette.primary.main,
    zIndex: 1,
    fontSize: 26,
  },
}));

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed, amount } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant='subtitle1'
        color='primary'
        sx={{ opacity: amount ? 1 : 0 }}
      >
        {amount ? amount : 0}€
      </Typography>
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? (
          <RadioButtonCheckedIcon className={classes.completed} />
        ) : (
          <div className={classes.circle} />
        )}
      </div>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps(props) {
  const { installment, deposit } = props;
  let arr = [];

  arr.push({
    _id: '123112',
    title: 'Deposit',
    payment: { ...deposit },
  });

  for (var i = 1; i < installment.noOfInstallments; i++) {
    arr.push({
      _id: `121212${i}`,
      title: `Payment ${i}`,
      payment: {
        ...installment,
      },
    });
  }

  arr.push({
    _id: '123115',
    title: 'Reserve',
    payment: null,
  });

  return arr;
}

const checkStatus = (props) => {
  let a = 0;
  props.forEach((element) => {
    if (element?.payment?.status === 'paid') a++;
    else {
      // eslint-disable-next-line no-eval
      if (eval(element?.payment?.status) === 1) a++;
    }
  });

  return a;
};

const paymentMessage = [
  'deposit to be paid before 23/12/2021 before cancellation',
  'payment deadline: 23/12/2021 before cancellation',
];

export default function CustomizedSteppers({ purchase }) {
  const classes = useStyles();
  const steps = getSteps(purchase);
  const chkStatus = checkStatus(steps);

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={chkStatus}
        connector={<QontoConnector />}
      >
        {steps.map((step) => (
          <Step key={step._id}>
            <StepLabel
              StepIconComponent={QontoStepIcon}
              StepIconProps={{ amount: step?.payment?.amount }}
            >
              <Typography
                variant='subtitle1'
                color='primary'
                sx={{
                  mt: -0.7,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                {step.title}
              </Typography>
              {step.title === 'Deposit' ? (
                step?.payment?.status === '0' ? (
                  <Typography variant='body1' sx={{ color: 'red' }}>
                    {paymentMessage[0]}
                    setState(false)
                  </Typography>
                ) : (
                  <Typography variant='body1' color='textSecondary'>
                    Paid On
                    {step?.payment?.paidOn}
                  </Typography>
                )
              ) : step.title === 'Reserve' ? (
                <Typography variant='body1' sx={{ color: 'red' }}>
                  {paymentMessage[1]}
                </Typography>
              ) : (
                ''
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

// return [
//   {
//     _id: '1231',
//     isComplete: true,
//     amount: 500,
//     isPaid: true,
//     paidAt: new Date(),
//   },
//   {
//     _id: '1231',
//     isComplete: true,
//     amount: 500,
//     isPaid: false,
//     paidAt: new Date(),
//   },
//   {
//     _id: '1231',
//     isComplete: true,
//     amount: 500,
//     isPaid: true,
//     paidAt: new Date(),
//   },
// ];
