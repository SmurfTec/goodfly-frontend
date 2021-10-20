import React from 'react';

import {
  Grid,
  Box,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

import paypalSvg from 'Assets/svg/paypal.svg';
import { ReactSVG } from 'react-svg';

const PaypalOption = ({ value }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            minWidth: 350,
            '& span': {
              fontSize: '0.875rem',
              fontWeight: 'bold',
              color: '#666666',
            },
          }}
        >
          <FormControlLabel
            value={value}
            label='Paypal'
            control={<Radio />}
          />
          <ReactSVG src={paypalSvg} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default PaypalOption;
