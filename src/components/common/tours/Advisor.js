import React from 'react';
import styles from 'Styles/FlashSale/AdvisorStyles';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const Advisor = () => {
  const { t } = useTranslation();
  const classes = styles();
  return (
    <div className={classes.root}>
      <Typography variant='h6' className={classes.title}>
        {t('YOUR GOODFLY ONLINE ADVISOR')}
      </Typography>
      <Typography variant='body1' className={classes.content}>
        {t('Call a member of our agency directly at')}
      </Typography>
      <Typography variant='h3'>01 34 74 19 39</Typography>
    </div>
  );
};

export default Advisor;
