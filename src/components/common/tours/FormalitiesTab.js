import React from 'react';
// import { makeStyles } from '@material-ui/styles';
import { Grid, Skeleton, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';

// const useStyles = makeStyles((theme) => ({}));

const FormalitiesTab = ({ formalities }) => {
  // const classes = useStyles();

  return (
    <div>
      <Grid container>
        {formalities
          ? formalities.map((formality) => (
              <Grid item xs={12} sm={6} key={formality._id}>
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'self-end',
                    justifyContent: 'left',
                  }}
                >
                  <Typography variant='h1' style={{ fontSize: '3rem' }}>
                    {' '}
                    .{' '}
                  </Typography>
                  <Typography variant='h4'>{formality.title}</Typography>
                </Box>
                <Box style={{ paddingLeft: '1.5rem' }}>
                  <Typography variant='h5'>{formality.subtitle}</Typography>
                  <Typography variant='text' style={{ fontSize: '0.8rem' }}>
                    {formality.description}
                  </Typography>
                </Box>
              </Grid>
            ))
          : [1, 2, 3, 4, 5].map((el) => (
              <Grid item xs={12} sm={6} key={el}>
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'self-end',
                    justifyContent: 'left',
                  }}
                >
                  <Typography variant='h1' style={{ fontSize: '3rem' }}>
                    {/* <Skeleton variant='text' /> */}
                  </Typography>
                  <Typography variant='h4'>
                    <Skeleton variant='text' width='80%' />
                  </Typography>
                </Box>
                <Box style={{ paddingLeft: '1.5rem' }}>
                  <Typography variant='h5'>
                    <Skeleton variant='text' />
                  </Typography>
                  <Typography variant='text' style={{ fontSize: '0.8rem' }}>
                    <Skeleton variant='text' />
                  </Typography>
                </Box>
              </Grid>
            ))}
      </Grid>
    </div>
  );
};

export default FormalitiesTab;
