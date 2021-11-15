import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue, red } from '@material-ui/core/colors';
import { PayPalButton } from 'react-paypal-button-v2';

import CheckIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import uuid from 'uuid/dist/v4';
import { DialogActions, DialogContent } from '@material-ui/core';
import UseToggle from 'Hooks/useToggle';
import { handleCatch, makeReq } from 'Utils/constants';
import { toast } from 'react-toastify';

const useStyles = makeStyles({
  root: {
    '& .MuiDialog-paper': {
      minWidth: '50vw',
      minHeight: 401,
    },
  },
  Title: {
    // width: '300px',
    '& h2': {
      fontFamily: 'sans-serif',
    },
  },
  List: {
    '& span': {
      fontFamily: 'sans-serif',
    },
  },
  yesIcon: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  cancelIcon: {
    backgroundColor: red[100],
    color: red[600],
  },
});

export default function PaymentDialog(props) {
  const { payment, open, toggleDialog, dialogTitle, success, purchaseId } =
    props;
  const classes = useStyles();

  return (
    <Dialog
      onClose={toggleDialog}
      aria-labelledby='simple-dialog-title'
      open={open}
      className={classes.root}
    >
      <DialogTitle id='simple-dialog-title' className={classes.Title}>
        {dialogTitle || 'Make Payment'}
      </DialogTitle>
      <DialogContent>
        {payment ? (
          <PayPalButton
            amount={payment.amount}
            options={{
              clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
            }}
            onSuccess={async (details, data) => {
              console.log(`details`, details);
              console.log(`data`, data);

              const resData = await makeReq(
                `/purchases/${purchaseId}/makePayment/${payment._id}`,
                {
                  body: {
                    paymentMethod: 'paypal',
                  },
                },
                'PATCH'
              );
              console.log(`resData`, resData);
              toast.success('Payment Paid successfully');
              success(resData.purchase);
            }}
          />
        ) : (
          <div className='loader'></div>
        )}
      </DialogContent>
      <DialogActions>
        <List className={classes.List}>
          <ListItem button onClick={toggleDialog} key={uuid()}>
            <ListItemAvatar>
              <Avatar className={classes.cancelIcon}>
                <CancelIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Cancel' />
          </ListItem>
        </List>
      </DialogActions>
    </Dialog>
  );
}
