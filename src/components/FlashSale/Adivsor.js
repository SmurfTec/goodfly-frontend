import React from 'react';
import useStyles from 'Styles/FlashSale/AdvisorStyles';
import { Typography } from '@material-ui/core';

const Adivsor = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='h6' className={classes.title}>
        YOUR GOODFLY ONLINE ADVISOR
      </Typography>
      <Typography variant='body1' className={classes.content}>
        Call a member of our agency directly at
      </Typography>
      <Typography variant='h3'>01 34 74 19 39</Typography>
    </div>
  );
};

export default Adivsor;
