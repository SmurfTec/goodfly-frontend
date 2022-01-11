import React, { useContext, useEffect, useMemo, useState } from 'react';
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
import { useTheme } from '@material-ui/styles';
import UseToggle from 'Hooks/useToggle';
import { ConfirmDialogBox, PaymentDialog } from 'dialogs';
import { ToursContext } from 'Contexts/ToursContext';
import { daysBetween } from 'Utils/datePickerCheck';
import { AuthContext } from 'Contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const PurchaseCollapseItem = (props) => {
  const { cancelReservation } = useContext(ToursContext);
  const { updateMe, user } = useContext(AuthContext);
  const classes = styles();
  const theme = useTheme();
  const [isCancelOpen, toggleCancelOpen] = UseToggle(false);
  const [isPaymentOpen, togglePaymentOpen] = UseToggle(false);
  const [latestUnpaidPayment, setLatestUnpaidPayment] = useState();
  const { purchase } = props;
  const [expanded, setExpanded] = React.useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!purchase) return;

    // * Only Validated and ScheduleInProgress purchases can have payments
    if (!['validated', 'schedule-inProgress'].includes(purchase.status)) return;

    // * Find the first unpaid payment
    const targetPayment = purchase.payments.find((el) => !el.isPaid);
    // console.log(`targetPayment`, targetPayment);
    setLatestUnpaidPayment(targetPayment);
  }, [purchase]);

  const handleExpandClick = () => {
    setExpanded((st) => !st);
  };

  const handlePay = () => {
    // console.log('Handle Payment');
    togglePaymentOpen();
  };

  const handleCancell = () => {
    cancelReservation(purchase._id);
    toggleCancelOpen();
  };

  const handlePaymentSuccess = (updatedPurchase) => {
    togglePaymentOpen();
    console.log(`updatedPurchase._id`, updatedPurchase._id);
    let updatedUser = {
      ...user,
      Purchases: user.Purchases.map((el) =>
        el._id === updatedPurchase._id ? updatedPurchase : el
      ),
    };

    console.log(`updatedUser`, updatedUser);
    updateMe(updatedUser, true);
  };
  const cancelResButton = (
    <Button
      variant='outlined'
      color='primary'
      onClick={toggleCancelOpen}
      fullWidth
      disabled={daysBetween(new Date(), new Date(purchase.departureDate)) <= 14}
    >
      {t('I Want To Cancel')}
    </Button>
  );

  const subtractDays = (date, days) => {
    date.setDate(date.getDate() - days);
    return date;
  };

  const reservationConfig = useMemo(() => {
    //? 0 means 'client has not yet meet with the staff member'
    // console.log(purchase.status);
    if (purchase.status === 'pre-reservation') {
      return cancelResButton;
    }

    //? 1 means 'The client has met with a staff member and discussed about reservation.'
    else if (
      purchase.status === 'validated' ||
      purchase.status === 'schedule-inProgress'
    ) {
      return (
        <>
          {/* <Typography variant='body2' component='span' align='center'>
            Reservation ({purchase?.validationDate})
          </Typography> */}
          <Button
            variant='contained'
            color='primary'
            sx={{ minHeight: 65, boxShadow: 'none' }}
            fullWidth
            onClick={handlePay}
          >
            {t('To Pay')}
          </Button>
          {cancelResButton}
        </>
      );
    }
    //? After full payment by the user or after successful reservation.
    else if (purchase.status === 'reservation-paid') {
      let maxCancellationDate = new Date(
        subtractDays(new Date(purchase.departureDate), 45)
      );

      if (maxCancellationDate < new Date()) return <></>;
      return (
        <>
          <Typography
            variant='body2'
            component='span'
            align='center'
          ></Typography>
          {cancelResButton}
          <Typography
            variant='body2'
            sx={{ color: 'red' }}
            component='span'
            align='center'
          >
            {t('Cancellation possible until ')}
            {maxCancellationDate.toLocaleDateString()}
          </Typography>
        </>
      );
    }
  }, [purchase]);

  const paymentDetails = useMemo(() => {
    if (purchase.status === 'pre-reservation')
      return (
        <Typography variant='subtitle2' component='span' sx={{ color: 'red' }}>
          {t(
            'A member of the Goodfly team will get in touch with you very soon to set up your payment schedule for this trip! a bit of patience.'
          )}
        </Typography>
      );
    else if (['validated', 'schedule-inProgress'].includes(purchase.status)) {
      const remAmount = purchase.totalAmount - purchase.paidAmount;
      return (
        <>
          <Typography
            variant={'subtitle2'}
            component='span'
            sx={{ color: 'red', mb: 2 }}
            align='center'
          >
            {t('remaining to pay for this trip')} : {remAmount}€
          </Typography>
          <Stepper purchase={purchase} />
        </>
      );
    } else if (purchase.status === 'reservation-paid') {
      const remAmount = 0;
      return (
        <>
          <Typography
            variant={'subtitle2'}
            component='span'
            sx={{ color: 'red', mb: 2 }}
            align='center'
          >
            {t('remaining to pay for this trip')} : {remAmount}€
          </Typography>
          <Grid container spacing={2}>
            <Grid item sm={12} md={9}>
              <Stepper purchase={purchase} />
            </Grid>

            <Grid
              item
              sm={12}
              md={3}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Typography
                variant='h5'
                style={{
                  width: 200,
                  textAlign: 'center',
                  color: '#fff',
                  backgroundColor: theme.palette.primary.main,
                  padding: 20,
                  borderRadius: 10,
                }}
              >
                {t('Congratulations!')} {t('Your Trip is Reserved')}
              </Typography>
            </Grid>
          </Grid>
        </>
      );
    } else
      return (
        <Typography variant='h5' color='info'>
          {t('Your Trip is in')}{' '}
          <span style={{ color: theme.palette.warning.main }}>
            "{t(purchase.status)}"
          </span>{' '}
          {t('Status')} !
        </Typography>
      );
  }, [purchase]);

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
            {purchase.trip
              ? purchase.trip.title.toUpperCase()
              : t('Custom Trip')}{' '}
            -{' '}
            {purchase.departureDate
              ? new Date(purchase.departureDate).toDateString()
              : t('Open Offer')}{' '}
            -
          </Typography>
          <Typography
            variant='subtitle1'
            color='textSecondary'
            component='span'
            sx={{ fontStyle: 'italic' }}
          >
            {purchase.totalAmount}€
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
        <Typography variant='subtitle2' component='span' color='textSecondary'>
          {t('Timeline')}
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
            <Box className={classes.resConfig}>{reservationConfig}</Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box className={classes.payDetailsGrid}>{paymentDetails}</Box>
          </Grid>
        </Grid>
      </Collapse>
      <ConfirmDialogBox
        open={isCancelOpen}
        toggleDialog={toggleCancelOpen}
        dialogTitle={`${t('Cancel this Reservation')}?`}
        success={handleCancell}
      />
      <PaymentDialog
        open={isPaymentOpen}
        toggleDialog={togglePaymentOpen}
        dialogTitle={t('Make Payment for this Trip')}
        success={handlePaymentSuccess}
        payment={latestUnpaidPayment}
        purchaseId={purchase._id}
      />
    </>
  );
};

export default PurchaseCollapseItem;
