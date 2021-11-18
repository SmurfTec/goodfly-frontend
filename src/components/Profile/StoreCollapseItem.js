import React, { useContext, useState } from 'react';
import {
  Typography,
  IconButton,
  Collapse,
  Divider,
  Button,
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import classnames from 'classnames';
import styles from 'Styles/Profile/ProfileTabStyles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { PayPalButton } from 'react-paypal-button-v2';
import UseToggle from 'Hooks/useToggle';

import paypalSvg from 'Assets/svg/paypal.svg';
import { ReactSVG } from 'react-svg';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { makeReq } from 'Utils/constants';
import { AuthContext } from 'Contexts/AuthContext';

const StoreCollapseItem = ({ order }) => {
  const classes = styles();
  const { getMe } = useContext(AuthContext);
  const [showPaypalBtns, toggleShowPaypalBtns] = UseToggle(false);
  // const { _id, status, orderItems } = order;
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded((st) => !st);
  };

  const history = useHistory();

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
          <Typography variant='h5'>
            {order.orderItems
              .slice(0, 3)
              .map((el) => `${el.product.name}  `)}
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
          color={order.status === 'unpaid' ? 'error' : 'success'}
        >
          {order.status}
        </Typography>
      </Box>
      <Collapse
        className={classes.collapse}
        in={expanded}
        timeout='auto'
        unmountOnExit
      >
        <Box className={classes.content}>
          {/* {children} */}
          {order.orderItems.map((item) => (
            <Typography
              variant='subtitle2'
              color='textSecondary'
              sx={{
                fontStyle: 'italic',
                display: 'flex',
                columnGap: 3,
                mb: 3,
              }}
            >
              {/* <Box sx={{}}> */}
              <span>{item.product.name}</span>
              <span>{item.quantity}</span>
              <span>{item.subTotal / item.quantity}€</span>
              <span>{item.subTotal}€</span>
              {/* </Box> */}
            </Typography>
          ))}
          {/* <br /> */}
          <Divider />
          <Typography
            variant='subtitle2'
            color='textSecondary'
            sx={{ fontStyle: 'italic', mt: 1 }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                columnGap: 3,
              }}
            >
              <span>Subtotal : {order.subTotal}€</span>
              <span>Shipping Charges : {order.deliveryCharges}€</span>
              <span>Total : {order.total}€</span>
            </Box>
            {order.status === 'unpaid' && (
              <Box
                display='flex'
                justifyContent='flex-end'
                columnGap={2}
                alignItems='center'
              >
                <Button component='div'>
                  <Typography variant='h5'>Pay Order</Typography>
                  <ReactSVG
                    src={paypalSvg}
                    onClick={toggleShowPaypalBtns}
                  />
                </Button>
              </Box>
            )}
            {order.status === 'unpaid' && showPaypalBtns && (
              <Box display='flex' justifyContent='flex-end'>
                <PayPalButton
                  amount={order.total}
                  options={{
                    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
                  }}
                  onSuccess={async (details, data) => {
                    // console.log(`details`, details);
                    // console.log(`data`, data);

                    // console.log(`order`, order);
                    const resData = await makeReq(
                      `/orders/pay/${order._id}`,
                      {},
                      'PATCH'
                    );
                    // console.log(`resData`, resData);
                    getMe();
                    toast.success('Order Payed successfully');
                  }}
                />
              </Box>
            )}
          </Typography>
        </Box>
      </Collapse>
    </>
  );
};

export default StoreCollapseItem;
