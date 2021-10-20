import React, { useContext } from 'react';
import { Typography, Box, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { StoreContext } from 'Contexts/StoreContext';
import { Link } from 'react-router-dom';

const StoreSubNav = () => {
  const { cart } = useContext(StoreContext);
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
          '&:hover': {
            transform: 'scale(1.3)',
            transition: '0.2s',
          },
          '& .MuiBadge-badge': {
            color: 'white',
            backgroundColor: '#46B9F6',
          },
          '& svg': {
            color: '#666666',
          },
          cursor: 'pointer',
        }}
        component={Link}
        to='/store/cart'
      >
        <Badge badgeContent={cart.orderItems.length}>
          <ShoppingCartIcon />
        </Badge>
      </Box>
    </Box>
  );
};

export default StoreSubNav;
