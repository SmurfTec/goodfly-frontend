import { Card, Paper, Grid, Typography, CardContent } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import FlashIcon from '@material-ui/icons/OfflineBoltOutlined';
import FlashWhite from 'Assets/flashwhite.svg';
import FlashRed from 'Assets/flashred.svg';
import { Box } from '@material-ui/system';
import ArrowIcon from '@material-ui/icons/ArrowForwardIos';

import Skeleton from 'react-loading-skeleton';

const styles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    alignItems: 'stretch',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    color: '#fff',
    [theme.breakpoints.up('sm')]: {
      minHeight: 420,
    },
  },
  card: {
    border: '2px solid #fff',
    backgroundColor: 'transparent',
    borderBottomLeftRadius: 0,
    maxWidth: 55,
  },
  priceCard: {
    border: '2px solid #fff',
    color: theme.palette.text.secondary,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

const flashData = [
  {
    id: 1,
    title: 'Malaysia',
    boardType: 'Full Board',
    duration: '1week',
    price: '990€',
    description: '',
  },
  {
    id: 2,
    title: 'Marrakech',
    boardType: 'Week-end Express',
    duration: '3jours',
    price: '355€',
    description: '',
  },
  {
    id: 3,
    title: 'Algeria',
    boardType: 'Villa',
    duration: '1week',
    price: '395€',
    description: 'lux premium',
  },
  {
    id: 4,
    title: 'Indonesia',
    boardType: 'RoadTrip',
    duration: '2week',
    price: '1455€',
    description: 'with guide!',
  },
  {
    id: 5,
    title: 'Indonesia',
    boardType: 'RoadTrip',
    duration: '2week',
    price: '1455€',
    description: 'with guide!',
  },
];

const FlashPromos = ({ tours }) => {
  const classes = styles();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <img src={FlashRed} width='25px' height=' 25px' alt='White' />
        <Typography
          variant='h3'
          sx={{
            fontStyle: 'italic',
            mx: 1,
          }}
          align='center'
          color='text.secondary'
        >
          Flash Sales
        </Typography>
        <img src={FlashRed} width='25px' height=' 25px' alt='White' />
      </Box>
      {tours ? (
        <Paper elevation={0} className={classes.paper}>
          <Grid container spacing={2}>
            {tours.map((data, i) => (
              <React.Fragment key={i}>
                <Grid item xs={3} sm={3}>
                  <Card className={classes.card}>
                    <Typography
                      variant='h3'
                      sx={{ color: 'white' }}
                      align='center'
                    >
                      {i + 1}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={5} sm={5}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Typography variant='subtitle1' sx={{ mr: 1 }}>
                      {data.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={FlashWhite}
                        width='20px'
                        height='20px'
                        alt='White'
                      />
                      <span>{data.duration}</span>
                    </Box>
                  </Box>

                  <Typography variant='subtitle2'>{data.boardType}</Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Card className={classes.priceCard} sx={{ px: 1, py: 1 }}>
                    <Typography variant='h4' align='center'>
                      {/* <ArrowIcon size='small' sx={{ pt: 1 }} /> */}
                      {data.price}
                    </Typography>
                  </Card>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Paper>
      ) : (
        <Skeleton height={420} />
      )}
    </>
  );
};

export default FlashPromos;
