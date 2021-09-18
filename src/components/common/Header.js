import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ReactCountryFlag from 'react-country-flag';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import InfoIcon from '@material-ui/icons/Info';
import logo from 'Assets/airplane.svg';
import useStyles from 'Styles/Navbar/NavbarStyles';
import { Box } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
// import { ThemeContext } from 'Contexts/ThemeContext';
// import DarkModeToggle from 'react-dark-mode-toggle';
import Navbar from './Navbar';

const Header = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState(null);

  // const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={classes.MobileMenu}
    >
      <MenuItem>
        <ReactCountryFlag
          className='emojiFlag'
          countryCode='GB' // SA and FR
          style={{
            fontSize: '1.5em',
            lineHeight: '2em',
            cursor: 'pointer',
          }}
          aria-label='United States'
          svg
        />
      </MenuItem>
      <MenuItem>
        <Typography
          variant='p'
          color='primary.dark'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <PersonIcon />
          Contact
        </Typography>
      </MenuItem>
      <MenuItem>
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
      </MenuItem>
      <MenuItem>
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
      </MenuItem>
    </Menu>
  );

  return (
    <div className={`${classes.root}`}>
      <AppBar position='fixed' className={classes.Appbar}>
        <Toolbar>
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
            <img
              src={logo}
              style={{ width: 40, height: 50 }}
              alt='logo'
            />
          </Typography>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 15,
            }}
          >
            {/* <DarkModeToggle
              onChange={toggleDarkMode}
              checked={isDarkMode}
              size={50}
              className={classes.darkBtn}
            /> */}
          </div>
          <div className={classes.sectionDesktop}>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='flex-end'
              flexGrow='1'
              maxWidth={500}
            >
              <ReactCountryFlag
                className='emojiFlag'
                countryCode='GB' // SA and FR
                style={{
                  fontSize: '1.5em',
                  lineHeight: '2em',
                  cursor: 'pointer',
                }}
                aria-label='United States'
                svg
              />
              <Typography
                variant='p'
                color='primary.dark'
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <PersonIcon />
                Contact
              </Typography>
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
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              style={{
                marginLeft: 'auto',
                color: '#000',
              }}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Box paddingTop={'64px'}> </Box>
      <Navbar />
    </div>
  );
};
export default withRouter(Header);
