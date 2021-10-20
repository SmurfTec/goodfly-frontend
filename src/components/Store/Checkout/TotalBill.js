import React from 'react';
import {
  Typography,
  Button,
  Box,
  Paper,
  Divider,
} from '@material-ui/core';

const TotalBill = ({ validateForm, formName, cart }) => {
  return (
    <>
      <Typography variant='h4' sx={{ mt: 8 }}>
        Basket total
      </Typography>
      <Paper
        elevation={0}
        sx={{ backgroundColor: '#fafafa', p: 2, mt: 3 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mx: 5,
            my: 3,
          }}
        >
          <Box
            sx={{
              mx: 2,
              display: 'flex',
              columnGap: 2,
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h4' color='textSecondary'>
              Subtotal
            </Typography>
            <Typography variant='h4' color='textSecondary'>
              {cart.subTotal}
            </Typography>
          </Box>
          <Divider sx={{ my: 3, mx: -3 }} />
          <Box
            sx={{
              mx: 2,
              display: 'flex',
              columnGap: 2,
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h4' color='textSecondary'>
              Total
            </Typography>
            <Typography variant='h4' color='textSecondary'>
              {cart.total}
            </Typography>
          </Box>
        </Box>
      </Paper>
      {console.log('FormName ', formName)}
      {console.log('!FormName ', !formName)}
      {!formName ? (
        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 3, minHeight: 70, fontSize: 20 }}
          fullWidth
          onClick={validateForm}
        >
          VALIDATE THE ORDER
        </Button>
      ) : (
        <Button
          type='submit'
          form={formName}
          variant='contained'
          color='primary'
          sx={{ mt: 3, minHeight: 70, fontSize: 20 }}
          fullWidth
        >
          VALIDATE THE ORDER
        </Button>
      )}
    </>
  );
};

export default TotalBill;
