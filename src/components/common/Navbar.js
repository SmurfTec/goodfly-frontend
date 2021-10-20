import React from 'react';

import { Typography, Box, Container } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  nav: {
    display: 'flex',
    overflowX: 'auto',
    alignItems: 'center',

    maxWidth: 1250,
    margin: '1rem auto',

    '& span': {
      flex: '0 0 auto',
      padding: '8px 10px',
      marginRight: '1rem',
      fontStyle: 'normal',
      letterSpacing: 'normal',
      lineHeight: 'normal',
      /* Text style for "Hôtels et" */
      color: theme.palette.text.secondary,
      fontFamily: 'Avenir Next Condensed Demi Bold',
      fontSize: 15,
      fontWeight: 'bold',

      [theme.breakpoints.down('sm')]: {
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // position: 'absolute',
        // right: '0',
        // top: 20,
        // backgroundColor: theme.palette.primary,
        display: 'none',
      },
    },

    [theme.breakpoints.down('sm')]: {
      display: 'none',
      position: 'relative',
      height: 30,
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <nav className={classes.nav}>
      <Typography variant='p' color='primary.dark'>
        <NavLink
          to='/tours/ethical'
          activeStyle={{
            color: '#fa0f0c',
          }}
        >
          Ethical Trips
        </NavLink>
      </Typography>
      <Typography variant='p' color='primary.dark'>
        <NavLink to='/tours/spiritual'> Spiritual Trips</NavLink>
      </Typography>
      <Typography variant='p' color='primary.dark'>
        <NavLink to='/tours/excursions'>
          {' '}
          Excursions & Circuits
        </NavLink>
      </Typography>
      <Typography variant='p' color='primary.dark'>
        <NavLink to='/tours/destinations'> Destinations</NavLink>
      </Typography>
      <Typography variant='p' color='primary.dark'>
        <NavLink to='/ticketing'> Ticketing</NavLink>
      </Typography>
      <Typography variant='p' color='primary.dark'>
        <NavLink to='/hotels'> Hotels and accommodations</NavLink>
      </Typography>
      <Typography variant='p' color='primary.dark'>
        <NavLink to='/tours/flash-sales'> Flash Sales</NavLink>
      </Typography>
      <Typography variant='p' color='primary.dark'>
        <NavLink to='/transport'> Transport / Logictics</NavLink>
      </Typography>
      <Typography variant='p' color='primary.dark'>
        <NavLink to='/blogs'> Blog</NavLink>
      </Typography>
      <Typography variant='p' color='primary.dark'>
        <NavLink to='/promos'> Promos</NavLink>
      </Typography>
      <Typography variant='p' color='primary.dark'>
        <NavLink to='/tours/create'> Create Trip</NavLink>
      </Typography>
      <Typography variant='p' color='primary.dark'>
        <NavLink to='/store'> Store</NavLink>
      </Typography>

      <Typography variant='p' color='primary.dark'>
        <NavLink to='/contact-us'> Contact Us</NavLink>
      </Typography>
    </nav>
  );
};

export default Navbar;
