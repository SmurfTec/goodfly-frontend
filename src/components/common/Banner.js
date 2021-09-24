import React from 'react';
import { Container, Typography } from '@material-ui/core';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import Advisor from 'components/common/Adivsor';
import { makeStyles } from '@material-ui/styles';

export const styles = makeStyles((theme) => ({
   heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(3, 0, 6),
   },
   mainFeaturedPost: {
      position: 'relative',
      //   backgroundColor: theme.palette.grey[800],
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: (props) => `url(${props.imageUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: (props) => props.align,
      minHeight: 280,
      borderRadius: 15,
      [theme.breakpoints.down('sm')]: {
         minHeight: 200,
      },
   },
   title: {
      position: 'absolute',
      bottom: 20,
      left: 65,
      textShadow: '0px 0px 5px rgba(0,0,0,0.38)',
      textTransform: 'uppercase',
   },
}));

function Banner(props) {
   const classes = styles(props);
   return (
      <div className={classes.heroContent}>
         <Container className={classes.mainFeaturedPost}>
            <section className={classes.title}>
               <Typography variant='h3'>
                  {props.bannerTitle}
               </Typography>
            </section>
            <Advisor />
         </Container>
      </div>
   );
}

export default Banner;
