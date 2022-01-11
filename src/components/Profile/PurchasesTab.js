import { Container, Divider, Typography, Box } from '@material-ui/core';
import React, { useContext } from 'react';
import CollapseHeader from './CollapseHeader';
import StoreItem from './StoreCollapseItem';
import PurchaseItem from './PurchasesCollapseItem';
import { orders, purchases } from './DummyData';
import { StoreContext } from 'Contexts/StoreContext';
import { useTranslation } from 'react-i18next';

const PurchasesTab = ({ purchases, orders }) => {
  // const {orders,products} = useContext(StoreContext)
  const { t } = useTranslation();

  const orderDetails = (status) => {
    return orders
      ?.filter((order) => order.status === status)
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
      <CollapseHeader title={t('My Purchases')} subTitle='GOODFLY'>
        {purchaseDetails()}
      </CollapseHeader>
      <CollapseHeader title={t('My Orders')} subTitle='GOODFLYSTORE'>
        <Typography
          variant='subtitle1'
          color='textSecondary'
          sx={{ mb: 2, textTransform: 'capitalize' }}
        >
          {`${t('Completed')} ${t('Orders')}`}
        </Typography>
        {orderDetails('paid')}

        <Typography
          variant='subtitle1'
          color='textSecondary'
          sx={{ mb: 2, mt: 6, textTransform: 'capitalize' }}
        >
          {`${t('Current')} ${t('Orders')}`}
        </Typography>
        {orderDetails('unpaid')}
      </CollapseHeader>
    </Container>
  );
};

export default PurchasesTab;
