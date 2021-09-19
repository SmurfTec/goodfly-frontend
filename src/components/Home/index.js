import React from 'react';
import Typography from '@material-ui/core/Typography';

import useStyles from 'Styles/Home/HomeStyles';
// import 'react-perfect-scrollbar/dist/css/styles.css';
import { Grid } from '@material-ui/core';

import img1 from 'Assets/img/maldives.jpg';
import img2 from 'Assets/img/malaysia.jpg';
import img3 from 'Assets/img/desert.jpg';

import Tabs from './Tabs';

const Index = () => {
   const classes = useStyles();
   return (
      <div>
         <Grid container className={classes.MainGrid}>
            <Grid
               item
               xs={12}
               sm={6}
               className={classes.LeftGridItem}
            >
               <img
                  style={{ width: '80%' }}
                  src={img1}
                  alt='image 1'
               />
               <img
                  style={{ width: '40%' }}
                  src={img2}
                  alt='image 2'
               />
               <img
                  style={{ width: '40%' }}
                  src={img3}
                  alt='image 3'
               />
            </Grid>
            <Grid
               item
               xs={12}
               sm={6}
               className={classes.RightGridItem}
            >
               <Tabs />
            </Grid>
         </Grid>
      </div>
   );
};

export default Index;
