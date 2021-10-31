import React from 'react';
import { Typography, IconButton, Collapse } from '@material-ui/core';
import { Box } from '@material-ui/system';
import classnames from 'classnames';
import styles from 'Styles/Profile/ProfileTabStyles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const StoreCollapseItem = (props) => {
  const classes = styles();
  const { order } = props;
  // const { _id, status, orderItems } = order;
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded((st) => !st);
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
          <Typography variant='h5'>{order._id}</Typography>
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
        <Typography variant='subtitle2'>{order.status}</Typography>
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
              sx={{ fontStyle: 'italic' }}
            >
              <Box sx={{ display: 'flex', columnGap: 3 }}>
                <span>{item.name}</span>
                <span>{item.quantity}</span>
                <span>{item.subTotal / item.quantity}€</span>
                <span>{item.subTotal}€</span>
              </Box>
            </Typography>
          ))}
          {/* <br /> */}
          <Typography
            variant='subtitle2'
            color='textSecondary'
            sx={{ fontStyle: 'italic' }}
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
          </Typography>
        </Box>
      </Collapse>
    </>
  );
};

export default StoreCollapseItem;
