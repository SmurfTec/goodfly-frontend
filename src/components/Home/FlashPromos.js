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
import { useHistory } from 'react-router';

const styles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    alignItems: 'stretch',
    backgroundColor: theme.palette.primary.main,
    padding: 12,
    color: '#fff',
    [theme.breakpoints.up('sm')]: {
      minHeight: 420,
    },
  },
  card: {
    border: '2px solid #fff',
    backgroundColor: 'transparent',
    borderTopLeftRadius: 0,
    maxWidth: 55,
  },
  priceCard: {
    border: '2px solid #fff',
    color: theme.palette.text.secondary,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: 5,
  },
}));

const FlashPromos = ({ tours }) => {
  const history = useHistory();
  const classes = styles();
  const handleClick = (e) => {
    const { id } = e.currentTarget.dataset;
    history.push(`/tours/details/${id}`);
  };
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
        <img src={FlashRed} width='25px' height='25px' alt='White' />
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
          <Grid container spacing={1}>
            {tours.map((data, i) => (
              <React.Fragment key={data._id}>
                <Grid item xs={2} sm={2}>
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
                <Grid
                  item
                  xs={5}
                  sm={5}
                  data-id={data._id}
                  sx={{ cursor: 'pointer' }}
                  onClick={handleClick}
                >
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Typography variant='subtitle1' sx={{ mr: 1 }}>
                      {data.country}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={FlashWhite}
                        width='20px'
                        height='20px'
                        alt='White'
                      />
                      <span>{data.duration} days</span>
                    </Box>
                  </Box>
                  <Typography variant='h5'>{data.title}</Typography>
                </Grid>
                <Grid item xs={5} sm={5}>
                  <Card className={classes.priceCard} sx={{ px: 1, py: 1 }}>
                    <Typography variant='h4' align='center'>
                      <ArrowIcon size='small' sx={{ pt: 1 }} />
                      {data.price} €
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
