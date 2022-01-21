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
import v4 from 'uuid/dist/v4';
import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

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

export default function PaymentSteppers({ purchase }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        // activeStep={1}
        connector={<QontoConnector />}
      >
        {purchase.payments.map((payment, idx) => (
          <Step key={v4()}>
            <StepLabel
              StepIconComponent={QontoStepIcon}
              StepIconProps={{
                amount: parseInt(payment.amount),
                completed: payment.isPaid,
              }}
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
                {/* {payment.title} */}
                {`${t('Payment')} ${idx + 1}`}
              </Typography>
              {payment.isPaid ? (
                <Typography
                  variant='body1'
                  style={{
                    color: theme.palette.success.main,
                  }}
                >
                  {t('Paid On')}{' '}
                  {new Date(payment.paidDate).toLocaleDateString()}
                </Typography>
              ) : (
                <Typography variant='body1' color='error'>
                  {t('Deadline')}{' '}
                  {new Date(payment.deadline).toLocaleDateString()}
                </Typography>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
