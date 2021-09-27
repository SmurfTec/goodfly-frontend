import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Typography, Grid, IconButton, Box } from '@material-ui/core';
import { styles } from 'Styles/Footer/FooterStyles';
// import logo from 'Assets/img/airplane.svg';
import payment from 'Assets/img/paymentIcons.png';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import ArrowIcon from '@material-ui/icons/ArrowForwardIos';
import {
  aboutUs,
  menu,
  practicalInfo,
  reservations,
  quickAccess,
} from './FooterItems';

//? Social media Icons
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = () => {
  const history = useHistory();
  const classes = styles();
  return (
    <>
      <footer className={classes.footer}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <section className={classes.gridContent}>
              <Typography
                variant='h5'
                noWrap
                className={classes.logoTitle}
                color='common.white'
                onClick={() => history.push('/')}
              >
                GOODFLY
                <FlightTakeoffIcon />
                {/* <img
                     src={logo}
                     style={{ width: 40, height: 50 }}
                     alt='logo'
                  /> */}
              </Typography>
              <Typography
                variant='subtitle1'
                className={classes.contentTitle}
                sx={{ mt: 5 }}
              >
                About Us
              </Typography>
              {aboutUs.map((a) => (
                <Typography
                  variant='subtitle2'
                  className={classes.subContent}
                >
                  <Link key={a.item} to={a.url}>
                    {a.item}
                  </Link>
                </Typography>
              ))}
              <section className={classes.icons}>
                <IconButton aria-label='delete' color='inherit'>
                  <FacebookIcon />
                </IconButton>
                <IconButton aria-label='delete' color='inherit'>
                  <InstagramIcon />
                </IconButton>
                <IconButton aria-label='delete' color='inherit'>
                  <TwitterIcon />
                </IconButton>
                <IconButton aria-label='delete' color='inherit'>
                  <YouTubeIcon />
                </IconButton>
              </section>
            </section>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography
              variant='subtitle1'
              className={classes.contentTitle}
            >
              Menu
            </Typography>
            {menu.map((a) => (
              <Typography
                variant='subtitle2'
                className={classes.subContent}
              >
                <Link key={a.item} to={a.url}>
                  {a.item}
                </Link>
              </Typography>
            ))}
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography
              variant='subtitle1'
              className={classes.contentTitle}
            >
              Practical Information
            </Typography>
            {practicalInfo.map((a) => (
              <Typography
                variant='subtitle2'
                className={classes.subContent}
              >
                <Link key={a.item} to={a.url}>
                  {a.item}
                </Link>
              </Typography>
            ))}

            <Typography
              variant='subtitle1'
              className={classes.contentTitle}
              sx={{ mt: 3 }}
            >
              Reservations by Phone
            </Typography>

            {reservations.map((a, index) => (
              <Typography
                key={a}
                variant='subtitle2'
                color='common.white'
              >
                {a}
              </Typography>
            ))}
            <Typography
              variant='subtitle1'
              className={classes.contentTitle}
              sx={{ mt: 3 }}
            >
              Secure Payment
            </Typography>
            <Box
              sx={{
                my: 2,
                backgroundColor: 'white',
                padding: 1,
              }}
            >
              <img
                src={payment}
                //  width='100px'
                //  height='50px'
                alt='Payment Methods'
              />
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography
              variant='subtitle1'
              className={classes.contentTitle}
            >
              Quick Access
            </Typography>
            {quickAccess.map((a) => (
              <Typography
                variant='subtitle2'
                className={classes.subContent}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <ArrowIcon size='small' />
                {'  '}

                <Link key={a.item} to={a.url}>
                  {a.item}
                </Link>
              </Typography>
            ))}
          </Grid>
        </Grid>
      </footer>
      <footer className={classes.rightsReservedFooter}>
        <Typography variant='subtitle2' align='center'>
          {new Date().getFullYear()} GOODFLY.fr - All rights reserved
        </Typography>
      </footer>
    </>
  );
};

export default Footer;
