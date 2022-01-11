import React, { useContext, useState, useEffect } from 'react';
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
// import logo from 'Assets/img/airplane.svg';
// import logo from 'Assets/img/airplanesvg2.png';
import useStyles from 'Styles/Navbar';
import { Box, Divider } from '@material-ui/core';
import { withRouter, Link, NavLink } from 'react-router-dom';
// import { ThemeContext } from 'Contexts/ThemeContext';
// import DarkModeToggle from 'react-dark-mode-toggle';
import Navbar from './Navbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { AuthContext } from 'Contexts/AuthContext';
import { AccountBox } from '@material-ui/icons';
import v4 from 'uuid/dist/v4';
import logo from 'Assets/img/logo.png';
import NotificationsPopover from 'components/notify/NotificationsPopover';
import TelegramIcon from '@material-ui/icons/Telegram';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { languages } from 'Utils/constants';

const mobileNavContent = [
  {
    title: 'Ethical Travel',
    to: '/tours/ethical',
    info: [
      {
        name: 'Organized Trips',
        route: '/tours/ethical?type=organized',
      },
      {
        name: `Organic And Eco Travel 'wwoof'`,
        route: '/tours/ethical?type=organic',
      },
      {
        name: 'Train Trips',
        route: '/tours/ethical?type=train',
      },
      {
        name: 'Cruises',
        route: '/tours/ethical?type=cruises',
      },
    ],
  },
  {
    title: 'Spiritual Journeys',
    to: '/tours/spiritual',
    info: [
      {
        name: 'hajj',
        route: '/tours/spiritual?type=hajj',
      },
      {
        name: 'omra',
        route: '/tours/spiritual?type=omra',
      },
      {
        name: 'al-quds',
        route: '/tours/spiritual?type=al-quds',
      },
      {
        name: 'Combined Hajj / Omra',
        route: '/tours/spiritual?type=combine-hajj-omra',
      },
    ],
  },
  {
    title: 'Excursions & Circuits',
    to: '/tours/excursions',
    info: [
      {
        name: 'Excursions',
        route: '/tours/excursions?type=excursion',
      },
      {
        name: 'Circuits',
        route: '/tours/excursions?type=circuit',
      },
    ],
  },
  {
    title: 'Destinations',
    to: '/tours/destinations',
    info: [
      {
        name: 'africa',
        route: '/tours/destinations/africa',
      },
      {
        name: 'asia',
        route: '/tours/destinations/asia',
      },
      {
        name: 'europe',
        route: '/tours/destinations/europe',
      },
      {
        name: 'america',
        route: '/tours/destinations/america',
      },
      {
        name: 'oceania',
        route: '/tours/destinations/oceania',
      },
      {
        name: 'polar-lands',
        route: '/tours/destinations/polar-lands',
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
        name: 'Vehicle Rental',
        route: '/',
      },
    ],
  },
  {
    title: 'Hotels & Accommodations',
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
    title: 'Fresh Arrivals',
    to: '/tours/promos',
    // info: [],
  },
  {
    title: 'I create my trip',
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
  {
    title: 'Login',
    to: '/auth/login',
    // info: [],
  },
  {
    title: 'Logout',
    to: '/logout',
    // info: [],
  },
];

const Header = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, logoutUser } = useContext(AuthContext);
  const { t } = useTranslation();

  // const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [lang, setLang] = useState(null);

  useEffect(() => {
    const currentLanguageCode = cookies.get('i18next') || 'en';
    setLang(currentLanguageCode);
    setLang(
      languages.find((el) => el.code === currentLanguageCode).country_code
    );
  }, [lang]);

  const toggleMobileNav = () => {
    setOpenMobileNav((st) => !st);
    // console.log('mobileNavToggle');
  };

  const handleLanguage = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedLang = (e) => {
    const { myValue } = e.currentTarget.dataset;
    const { code } = e.currentTarget.dataset;
    console.log(`code`, code);

    i18next.changeLanguage(code);
    setLang(myValue);
    setAnchorEl(null);
  };

  const handleLogin = () => {
    history.push('/auth/login');
  };

  const logoSection = (
    <img
      src={logo}
      style={{
        width: 160,
        cursor: 'pointer',
      }}
      onClick={() => history.push('/')}
      alt=''
    />
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
      {user && (
        <NavLink to='/chat'>
          <IconButton aria-label='chat'>
            <TelegramIcon color='action' />
          </IconButton>
        </NavLink>
      )}
      {user && (
        <NavLink to='/profile'>
          <IconButton aria-label='profile'>
            <PersonIcon color='action' />
          </IconButton>
        </NavLink>
      )}
      <NavLink to='/contact-us'>
        <IconButton aria-label='contact-us'>
          <PhoneIcon color='action' />
        </IconButton>
      </NavLink>
      {user && (
        <>
          <IconButton aria-label='logout' onClick={logoutUser}>
            <ExitToAppIcon color='action' />
          </IconButton>
          <NotificationsPopover />
        </>
      )}

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
        {mobileNavContent.map((navContent) =>
          navContent.title === 'Logout' && !user ? (
            <React.Fragment key={v4()}></React.Fragment>
          ) : navContent.title === 'Login' && user ? (
            <React.Fragment key={v4()}> </React.Fragment>
          ) : (
            <React.Fragment key={v4()}>
              <Typography
                variant='h5'
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#fa0f0c',
                  },
                  mt: 3,
                  mb: 1,
                }}
              >
                {navContent?.title === 'Logout' ? (
                  <a onClick={logoutUser}>{t(navContent?.title)}</a>
                ) : (
                  <NavLink to={navContent?.to} sx={{ color: 'textSecondary' }}>
                    {t(navContent?.title)}
                  </NavLink>
                )}
              </Typography>
              {navContent?.info?.map((subContent) => (
                <React.Fragment key={v4()}>
                  <Typography variant='subtitle1' sx={{ mb: 1 }}>
                    <NavLink to={subContent?.route}>
                      {/* {t(subContent?.name.toLowerCase())} */}
                      {t(subContent?.name).slice(0, 1).toUpperCase()}
                      {t(subContent?.name).slice(1)}
                    </NavLink>
                  </Typography>
                </React.Fragment>
              ))}

              <Divider sx={{ mt: 3 }} />
            </React.Fragment>
          )
        )}
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
      <MenuItem data-my-value='GB' data-code='en' onClick={selectedLang}>
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
      <MenuItem data-my-value='SA' data-code='ar' onClick={selectedLang}>
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
      <MenuItem data-my-value='FR' data-code='fr' onClick={selectedLang}>
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
      maxWidth={550}
      columnGap={1}
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
      {user && (
        <Link to='/chat'>
          <Typography
            variant='p'
            color='primary.dark'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <TelegramIcon />
            {t('Messages')}
          </Typography>
        </Link>
      )}
      {user && (
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
            {t('Profile')}
          </Typography>
        </Link>
      )}
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
          {t('Contact Us')}
        </Typography>
      </Link>

      {user ? (
        <>
          <NotificationsPopover />
          <Typography
            variant='p'
            color='primary.dark'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
            onClick={logoutUser}
          >
            <ExitToAppIcon />
            {t('Logout')}
          </Typography>
        </>
      ) : (
        <Typography
          variant='p'
          color='primary.dark'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          onClick={handleLogin}
        >
          <AccountBox />
          {t('Login')}
        </Typography>
      )}
    </Box>
  );

  return (
    <>
      <AppBar position='fixed' className={classes.Appbar}>
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {logoSection}
          <Box className={classes.sectionMobile}>{mobileViewContent}</Box>

          <Box className={classes.sectionDesktop}>{desktopViewContent}</Box>
          <Navbar />
        </Toolbar>
      </AppBar>

      <Box>{mobileNavDrawer}</Box>
      <Box paddingTop={'64px'}> </Box>
    </>
  );
};
export default withRouter(Header);
