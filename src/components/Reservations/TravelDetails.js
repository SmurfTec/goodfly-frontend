import React from 'react';
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

export const TravelDetails = ({ tour, travellers, formId }) => {
  const classes = useStyles();
  const { title, price, startingDate } = tour;

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
              {new Date(startingDate).toDateString()}
            </Typography>
          </span>
          <Typography variant='subtitle1'>{price}</Typography>
        </Box>
        <Divider />
        <Box className={classes.box}>
          <span>
            <Typography variant='h5'>
              {travellers} x {price}
            </Typography>
            <Typography variant='body1'>
              vous et {travellers} voyageurs
            </Typography>
          </span>
          <Typography variant='subtitle1'>
            {parseInt(travellers) * parseFloat(price)}€
          </Typography>
        </Box>
        <Divider />
        <Box className={classes.box}>
          <span>
            <Typography variant='h5'>Estimasted Total TTC</Typography>
            {/* <Typography variant='body1'>dont TVA</Typography> */}
          </span>
          <Typography variant='subtitle1'>
            {parseInt(travellers) * parseFloat(price)}€
          </Typography>
        </Box>
      </Paper>
    </>
  );
};
