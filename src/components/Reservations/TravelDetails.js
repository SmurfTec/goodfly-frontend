import React, { useEffect, useMemo } from 'react';
import { Typography, Box, Paper, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    width: '100% ',
    justifyContent: 'space-between',
    paddingInline: theme.spacing(2),
    paddingBlock: theme.spacing(2),
  },
}));

export const TravelDetails = React.memo(({ tour, travelers }) => {
  const classes = useStyles();
  const { title, price, startingDate } = tour;

  const calculatePrice = () => {
    console.log('calculating price');
    return parseInt(travelers) * parseFloat(price);
  };

  const totalPrice = useMemo(() => calculatePrice(), [price, travelers]);
  // calculatePrice();

  return (
    <>
      <Typography variant='h4' sx={{ mb: 4.5 }}>
        Total
      </Typography>
      <Paper elevation={0} sx={{ px: 1, py: 2, backgroundColor: '#fafafa' }}>
        <Box className={classes.box}>
          <span>
            <Typography variant='h5'>{title}</Typography>
            <Typography variant='body1'>
              {startingDate
                ? new Date(startingDate).toDateString()
                : 'Open Offer'}
            </Typography>
          </span>
          <Typography variant='subtitle1'>{price}</Typography>
        </Box>
        <Divider />
        <Box className={classes.box}>
          <span>
            <Typography variant='h5'>
              {+travelers + 1} x {price}
            </Typography>
            <Typography variant='body1'>
              vous et {+travelers} voyageurs
            </Typography>
          </span>
          <Typography variant='subtitle1'>
            {parseInt(+travelers + 1) * parseFloat(price)}€
          </Typography>
        </Box>
        <Divider />
        <Box className={classes.box}>
          <span>
            <Typography variant='h5'>Estimasted Total TTC</Typography>
            {/* <Typography variant='body1'>dont TVA</Typography> */}
          </span>
          <Typography variant='subtitle1'>
            {/* {parseInt(travelers) * parseFloat(price)}€ */}
            {totalPrice}$
          </Typography>
        </Box>
      </Paper>
    </>
  );
});
