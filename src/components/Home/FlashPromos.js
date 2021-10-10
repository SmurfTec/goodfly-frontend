import {
  Card,
  Paper,
  Grid,
  Typography,
  CardContent,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import FlashIcon from '@material-ui/icons/OfflineBoltOutlined';
import FlashWhite from 'Assets/flashwhite.svg';
import FlashRed from 'Assets/flashred.svg';
import { Box } from '@material-ui/system';
import ArrowIcon from '@material-ui/icons/ArrowForwardIos';

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
    subtitle: 'Full Board',
    service: '1week',
    amount: '990€',
    desc: '',
  },
  {
    id: 2,
    title: 'Marrakech',
    subtitle: 'Week-end Express',
    service: '3jours',
    amount: '355€',
    desc: '',
  },
  {
    id: 3,
    title: 'Algeria',
    subtitle: 'Villa',
    service: '1week',
    amount: '395€',
    desc: 'lux premium',
  },
  {
    id: 4,
    title: 'Indonesia',
    subtitle: 'RoadTrip',
    service: '2week',
    amount: '1455€',
    desc: 'with guide!',
  },
];

const FlashPromos = () => {
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
      <Paper elevation={0} className={classes.paper}>
        <Grid container spacing={2}>
          {flashData.map((data, i) => (
            <>
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
                    <span>{data.service}</span>
                  </Box>
                </Box>

                <Typography variant='subtitle2'>
                  {data.subtitle}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Card
                  className={classes.priceCard}
                  sx={{ px: 1, py: 1 }}
                >
                  <Typography variant='h4' align='center'>
                    {/* <ArrowIcon size='small' sx={{ pt: 1 }} /> */}
                    {data.amount}
                  </Typography>
                </Card>
              </Grid>
            </>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default FlashPromos;
