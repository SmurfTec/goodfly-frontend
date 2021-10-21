import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import MoreIcon from '@material-ui/icons/MoreVert';
import ReactCountryFlag from 'react-country-flag';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import InfoIcon from '@material-ui/icons/Info';
// import logo from 'Assets/img/airplane.svg';
import logo from 'Assets/img/airplanesvg2.png';
import useStyles from 'Styles/Navbar/NavbarStyles';
import { Box, Divider } from '@material-ui/core';
import { withRouter, Link, NavLink } from 'react-router-dom';
// import { ThemeContext } from 'Contexts/ThemeContext';
// import DarkModeToggle from 'react-dark-mode-toggle';
import Navbar from './Navbar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const mobileNavContent = [
  {
    title: 'Ethical travel',
    to: '/tours/ethical',
    info: [
      {
        name: 'Organized travels',
        route: '/tours/ethical',
      },
    ],
  },
  {
    title: 'Spiritual journeys',
    to: '/tours/spiritual',
    info: [
      {
        name: 'Hajj',
        route: '/tours/spiritual',
      },
      {
        name: 'Omra',
        route: '/tours/spiritual',
      },
      {
        name: 'Al-Quds',
        route: '/tours/spiritual',
      },
      {
        name: 'Combined Omra / Al-Quds',
        route: '/tours/spiritual',
      },
    ],
  },
  {
    title: 'Excursions & Circuits',
    to: '/tours/excursions',
    info: [
      {
        name: 'Excursions',
        route: '/tours/excursions',
      },
      {
        name: 'Circuits',
        route: '/tours/excursions',
      },
    ],
  },
  {
    title: 'Destinations',
    to: '/tours/destinations',
    info: [
      {
        name: 'Africa',
        route: '/tours/destinations/Africa',
      },
      {
        name: 'Asia',
        route: '/tours/destinations/Asia',
      },
      {
        name: 'Europe',
        route: '/tours/destinations/Europe',
      },
      {
        name: 'America',
        route: '/tours/destinations/America',
      },
      {
        name: 'Oceania',
        route: '/tours/destinations/Oceania',
      },
      {
        name: 'Polar-Islands',
        route: '/tours/destinations/Polar-Islands',
      },
    ],
  },
  {
    title: 'Ticketing',
    to: '/',
    info: [
      {
        name: 'Planes',
        route: '/',
      },
      {
        name: 'Vehicles Rental',
        route: '/',
      },
    ],
  },
  {
    title: 'Hotels and Accommodation',
    to: '/',
    info: [
      {
        name: 'Hotels',
        route: '/',
      },
      {
        name: 'Villas',
        route: '/accomodations/villas',
      },
      {
        name: 'Appartments',
        route: '/accomodations/appartments',
      },
      {
        name: 'Mansions',
        route: '/accomodations/mansions',
      },
    ],
  },
  {
    title: 'Flash Sales',
    to: '/tours/flash-sales',
    // info: [],
  },
  {
    title: 'Promos',
    to: '/promos',
    // info: [],
  },
  {
    title: 'I Create My Trip',
    to: '/tours/create',
    // info: [],
  },
  {
    title: 'Blogs',
    to: '/blogs',
    // info: [],
  },
  {
    title: 'Store',
    to: '/store',
    // info: [],
  },
];

const Header = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [lang, setLang] = useState('GB');

  const toggleMobileNav = () => {
    setOpenMobileNav((st) => !st);
    console.log('mobileNavToggle');
  };

  const handleLanguage = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedLang = (e) => {
    const { myValue } = e.currentTarget.dataset;
    setLang(myValue);
    setAnchorEl(null);
  };

  const logoSection = (
    <Typography
      variant='h5'
      noWrap
      style={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: 160,
        fontWeight: 900,
      }}
      color='primary'
      onClick={() => history.push('/')}
    >
      GOODFLY
      <img src={logo} style={{ height: 50 }} alt='logo' />
      {/* <img
        src='https://svg-clipart.com/svg/blue/Ha4TkHw-airplane-vector.svg'
        style={{ width: 40, height: 50 }}
        alt='logo'
      /> */}
    </Typography>
  );

  const mobileViewContent = (
    <>
      <IconButton aria-label='delete' onClick={handleLanguage}>
        <ReactCountryFlag
          className='emojiFlag'
          countryCode={lang} // SA and FR
          style={{
            fontSize: '1.5rem',
            lineHeight: '2em',
            cursor: 'pointer',
          }}
          aria-label='United States'
          svg
        />
      </IconButton>
      <NavLink to='/profile'>
        <IconButton aria-label='profile'>
          <PersonIcon color='action' />
        </IconButton>
      </NavLink>
      <IconButton aria-label='contact-us'>
        <PhoneIcon color='action' />
      </IconButton>
      <IconButton aria-label='opinion'>
        <InfoIcon color='action' />
      </IconButton>

      <IconButton aria-label='toggleMenu' onClick={toggleMobileNav}>
        <MenuIcon color='action' sx={{ cursor: 'pointer' }} />
      </IconButton>
    </>
  );

  const mobileNavDrawer = (
    <Drawer
      open={openMobileNav}
      className={classes.drawer}
      onClose={toggleMobileNav}
      sx={{
        '& .MuiDrawer-paper': {
          padding: 3,
          minWidth: 280,
        },
      }}
    >
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
      >
        {logoSection}

        <IconButton aria-label='opinion' onClick={toggleMobileNav}>
          <ChevronLeftIcon
            size='large'
            sx={{ cursor: 'pointer', fontSize: '2rem' }}
          />
        </IconButton>
      </Box>
      <Box sx={{ my: 2 }}>
        {mobileNavContent.map((navContent) => (
          <React.Fragment key={navContent?.title}>
            <Typography
              variant='h5'
              sx={{
                '& a': {
                  color: '#000',
                },
                mt: 3,
                mb: 1,
              }}
            >
              <NavLink
                to={navContent?.to}
                sx={{ color: 'textSecondary' }}
              >
                {navContent?.title}
              </NavLink>
            </Typography>
            {navContent?.info?.map((subContent) => (
              <React.Fragment>
                <Typography variant='subtitle1' sx={{ mb: 1 }}>
                  <NavLink to={subContent?.route}>
                    {subContent?.name}
                  </NavLink>
                </Typography>
              </React.Fragment>
            ))}

            <Divider sx={{ mt: 3 }} />
          </React.Fragment>
        ))}
      </Box>
    </Drawer>
  );

  const languageMenu = (
    <Menu
      id='simple-menu'
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem data-my-value='GB' onClick={selectedLang}>
        <ListItemIcon>
          <ReactCountryFlag
            className='emojiFlag'
            countryCode={'GB'} // SA and FR
            style={{
              fontSize: '1.5rem',
              lineHeight: '2em',
              cursor: 'pointer',
            }}
            aria-label='English'
            svg
          />
        </ListItemIcon>
        <ListItemText primary='English' />
      </MenuItem>
      <MenuItem data-my-value='SA' onClick={selectedLang}>
        <ListItemIcon>
          <ReactCountryFlag
            className='emojiFlag'
            countryCode='SA' // SA and FR
            style={{
              fontSize: '1.5rem',
              lineHeight: '2em',
              cursor: 'pointer',
            }}
            aria-label='Arabic'
            svg
          />
        </ListItemIcon>
        <ListItemText primary='Arabic' />
      </MenuItem>
      <MenuItem data-my-value='FR' onClick={selectedLang}>
        <ListItemIcon>
          <ReactCountryFlag
            className='emojiFlag'
            countryCode='FR' // SA and FR
            style={{
              fontSize: '1.5rem',
              lineHeight: '2em',
              cursor: 'pointer',
            }}
            aria-label='French'
            svg
          />
        </ListItemIcon>
        <ListItemText primary='French' />
      </MenuItem>
    </Menu>
  );

  const desktopViewContent = (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      flexGrow='1'
      maxWidth={500}
      columnGap={3}
    >
      <IconButton aria-label='language' onClick={handleLanguage}>
        <ReactCountryFlag
          className='emojiFlag'
          countryCode={lang} // SA and FR
          style={{
            fontSize: '1.5rem',
            lineHeight: '2em',
            cursor: 'pointer',
          }}
          aria-label='United States'
          svg
        />
      </IconButton>
      {languageMenu}
      <Link to='/profile'>
        <Typography
          variant='p'
          color='primary.dark'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <PersonIcon />
          Profile
        </Typography>
      </Link>
      <Link to='/contact-us'>
        <Typography
          variant='p'
          color='primary.dark'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <PhoneIcon />
          Contact Us
        </Typography>
      </Link>
      <Typography
        variant='p'
        color='primary.dark'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <InfoIcon />
        Give Opinion
      </Typography>
    </Box>
  );

  return (
    <>
      <AppBar position='fixed' className={classes.Appbar}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {logoSection}
          <Box className={classes.sectionMobile}>
            {mobileViewContent}
          </Box>

          <Box className={classes.sectionDesktop}>
            {desktopViewContent}
          </Box>
        </Toolbar>
      </AppBar>

      <Box>{mobileNavDrawer}</Box>
      <Box paddingTop={'64px'}> </Box>

      <Navbar />
    </>
  );
};
export default withRouter(Header);
