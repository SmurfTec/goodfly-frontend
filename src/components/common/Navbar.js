import React from 'react';

import { Typography, Box, Container } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  nav: {
    display: 'flex',
    overflowX: 'hidden',
    alignItems: 'center',

    maxWidth: 1440,
    margin: '1rem auto',
    justifyContent: 'center',

    minHeight: 50,
    paddingBlock: 10,

    cursor: 'pointer',
    '&:hover': {
      overflowX: 'auto',
    },
    '& span': {
      flex: '0 0 auto',

      marginRight: '1rem',
      fontStyle: 'normal',
      letterSpacing: 'normal',
      lineHeight: 'normal',
      /* Text style for "Hôtels et" */
      color: theme.palette.text.secondary,
      fontFamily: 'Avenir Next Condensed Demi Bold',

      fontWeight: 'bold',
      fontSize: 13,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
      [theme.breakpoints.up('lg')]: {
        padding: '8px 10px',
        fontSize: 16.5,
      },
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
      {/* <Typography variant='p' color='primary.dark'>
        <NavLink to='/transport'> Transport / Logictics</NavLink>
      </Typography> */}
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
    </nav>
  );
};

export default Navbar;
