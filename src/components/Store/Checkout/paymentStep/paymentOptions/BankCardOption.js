import React from 'react';
import {
  FormControlLabel,
  Grid,
  Box,
  Radio,
} from '@material-ui/core';
import PaymentForm from '../PaymentForm';

import { ReactSVG } from 'react-svg';

import PaymentSvg1 from 'Assets/svg/payment1.svg';
import PaymentSvg2 from 'Assets/svg/payment2.svg';
import PaymentSvg3 from 'Assets/svg/payment3.svg';

const BankCardOption = ({ value, currentValue }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            '& span': {
              fontSize: '0.875rem',
              fontWeight: 'bold',
              color: '#666666',
            },
          }}
        >
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            sx={{ gap: '120px' }}
          >
            <FormControlLabel
              value={value}
              label='Bank Card'
              control={<Radio />}
            />
            <Box
              display='flex'
              flexDirection='row'
              alignItems='center'
              sx={{
                gap: '10px',
              }}
            >
              <ReactSVG src={PaymentSvg1} />
              <ReactSVG src={PaymentSvg2} />
              <ReactSVG src={PaymentSvg3} />
            </Box>
          </Box>
          {currentValue === 'card' && <PaymentForm />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default BankCardOption;
