import React from 'react';
import {
  Typography,
  IconButton,
  Collapse,
  Button,
  Grid,
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import classnames from 'classnames';
import styles from 'Styles/Profile/ProfileTabStyles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Stepper from './PaymentStepper';

const PurchaseCollapseItem = (props) => {
  const classes = styles();
  const { purchase } = props;
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded((st) => !st);
  };

  const handlePay = () => {
    console.log('Handle Payment');
  };
  const handleCancelRes = () => {
    console.log('Cancel Reservation');
  };

  const checkStatus = () => {
    if (purchase.meetingWithStaff === 'no') return 0;
    if (purchase.meetingWithStaff === 'yes') {
      if (purchase.reserved) return 2;
      else return 1;
    }
  };

  const cancelResButton = (
    <Button
      variant='outlined'
      color='primary'
      onClick={handleCancelRes}
      fullWidth
    >
      I want to cancel
    </Button>
  );

  const reservationConfig = (num) => {
    //? 0 means 'client has not yet meet with the staff member'
    // console.log(num);
    if (num === 0) {
      return cancelResButton;
    }

    //? 1 means 'The client has met with a staff member and discussed about reservation.'
    else if (num === 1) {
      return (
        <>
          <Typography variant='body2' component='span' align='center'>
            Reservation ({purchase?.bookedOn})
          </Typography>
          <Button
            variant='contained'
            color='primary'
            sx={{ minHeight: 65, boxShadow: 'none' }}
            fullWidth
            onClick={handlePay}
          >
            To Pay
          </Button>
          {cancelResButton}
        </>
      );
    }
    //? After full payment by the user or after successful reservation.
    else {
      return (
        <>
          <Typography variant='body2' component='span' align='center'>
            Reservation ({purchase?.bookedOn})
          </Typography>
          {cancelResButton}
          <Typography
            variant='body2'
            sx={{ color: 'red' }}
            component='span'
            align='center'
          >
            Cancellation possible until {purchase.date}
          </Typography>
        </>
      );
    }
  };

  const paymentDetails = (num) => {
    if (num === 0)
      return (
        <Typography
          variant='subtitle2'
          component='span'
          sx={{ color: 'red' }}
        >
          A member of the Goodfly team will get in touch with you very
          soon to set up your payment schedule for this trip! a bit of
          patience
        </Typography>
      );
    else {
      const remAmount =
        purchase.deposit.status === 'paid'
          ? purchase.price - purchase.deposit.amount
          : purchase.price;
      return (
        <>
          <Typography
            variant={'subtitle2'}
            component='span'
            sx={{ color: 'red', mb: 2 }}
            align='center'
          >
            remaining to pay for this trip : {remAmount}€
          </Typography>
          <Stepper purchase={purchase} />
        </>
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box className={classes.box}>
          <Typography variant='h5' component='span'>
            {purchase.name} - {purchase.date} -
          </Typography>
          <Typography
            variant='subtitle1'
            color='textSecondary'
            component='span'
            sx={{ fontStyle: 'italic' }}
          >
            {purchase.price}€
          </Typography>
          <IconButton
            disableRipple
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            <ExpandLessIcon />
          </IconButton>
        </Box>
        <Typography
          variant='subtitle2'
          component='span'
          color='textSecondary'
        >
          Timeline
        </Typography>
      </Box>
      <Collapse
        className={classes.collapse}
        in={expanded}
        timeout='auto'
        unmountOnExit
        sx={{ mt: 2, mb: 4 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box className={classes.resConfig}>
              {reservationConfig(checkStatus())}
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box className={classes.payDetailsGrid}>
              {paymentDetails(checkStatus())}
            </Box>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

export default PurchaseCollapseItem;