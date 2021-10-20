import React from 'react';

import {
  Grid,
  Box,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

const LoyaltyPointsOption = ({ value }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            minWidth: 300,
            '& span': {
              fontSize: '0.875rem',
              fontWeight: 'bold',
              color: '#666666',
            },
          }}
        >
          <FormControlLabel
            value={value}
            label='Pay with LoyaltyPoints'
            control={<Radio />}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoyaltyPointsOption;
