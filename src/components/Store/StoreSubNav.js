import React from 'react';
import { Typography, Box, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StoreSubNav = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant='h4'
          color='primary'
          sx={{ fontWeight: 900 }}
        >
          GOODFLY
        </Typography>
        <Typography
          variant='h4'
          color='primary'
          sx={{ fontStyle: 'italic', fontWeight: 300 }}
        >
          STORE
        </Typography>
      </Box>
      <Box
        sx={{
          '& .MuiBadge-badge': {
            color: 'white',
            backgroundColor: '#46B9F6',
          },
        }}
      >
        <Badge badgeContent={`1`}>
          <ShoppingCartIcon />
        </Badge>
      </Box>
    </Box>
  );
};

export default StoreSubNav;
