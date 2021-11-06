import { Container, Divider, Typography, Box } from '@material-ui/core';
import React, { useContext } from 'react';
import CollapseHeader from './CollapseHeader';
import StoreItem from './StoreCollapseItem';
import PurchaseItem from './PurchasesCollapseItem';
import { orders, purchases } from './DummyData';
import { StoreContext } from 'Contexts/StoreContext';

const PurchasesTab = ({ purchases, orders }) => {
  // const {orders,products} = useContext(StoreContext)

  const orderDetails = (status) => {
    return orders
      .filter((order) => order.status === status)
      .map((order) => (
        <Box>
          <StoreItem key={order?._id} order={order} />
          {/* <Divider sx={{ my: 1 }} /> */}
        </Box>
      ));
  };

  const purchaseDetails = () => {
    return purchases.map((item) => (
      <div>
        <PurchaseItem purchase={item} />
        {/* <Box sx={{ my: 2 }}> */}
        <Divider />
        {/* </Box> */}
      </div>
    ));
  };

  return (
    <Container sx={{ my: 3, minHeight: 550 }}>
      <CollapseHeader title='My Purchases' subTitle='GOODFLY'>
        {purchaseDetails()}
      </CollapseHeader>
      <CollapseHeader title='My Orders' subTitle='GOODFLYSTORE'>
        <Typography
          variant='subtitle1'
          color='textSecondary'
          sx={{ mb: 2, textTransform: 'capitalize' }}
        >
          Completed Orders
        </Typography>
        {orderDetails('paid')}

        <Typography
          variant='subtitle1'
          color='textSecondary'
          sx={{ mb: 2, mt: 6, textTransform: 'capitalize' }}
        >
          Current Orders
        </Typography>
        {orderDetails('unpaid')}
      </CollapseHeader>
    </Container>
  );
};

export default PurchasesTab;
