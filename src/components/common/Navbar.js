import React from 'react';

import { Typography, Button } from '@material-ui/core';
import { NavLink, Link, withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';

import useStyles from 'Styles/Navbar';
import NavbarData from './NavbarData';
// import { languages } from 'Utils/constants';
import { useTranslation } from 'react-i18next';

const Navbar = ({ location }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const ethicalToursMenu = usePopupState({
    variant: 'popover',
    popupId: 'Ethical Trips',
  });

  const spiritualToursMenu = usePopupState({
    variant: 'popover',
    popupId: 'Spiritual Trips',
  });

  const excursionsToursMenu = usePopupState({
    variant: 'popover',
    popupId: 'Excursions & Circuits',
  });

  const destinationsToursMenu = usePopupState({
    variant: 'popover',
    popupId: 'Destinations',
  });

  return (
    <nav className={classes.nav}>
      {NavbarData.map((navItem, idx) => {
        return (
          <React.Fragment key={idx}>
            <Typography
              variant='p'
              color='primary.dark'
              onClick={() => {
                console.log('clicked', t(navItem.title));
              }}
              style={{
                color:
                  location.pathname.includes(navItem.path) &&
                  '#fa0f0c',
              }}
              // {...{}}
              {...(idx === 0 ? bindHover(ethicalToursMenu) : {})}
              {...(idx === 1 ? bindHover(spiritualToursMenu) : {})}
              {...(idx === 2 ? bindHover(excursionsToursMenu) : {})}
              {...(idx === 3 ? bindHover(destinationsToursMenu) : {})}
            >
              {idx >= 4 ? (
                <NavLink
                  to={navItem.path}
                  activeStyle={{
                    color: '#fa0f0c',
                  }}
                >
                  {t(navItem.title)}
                </NavLink>
              ) : (
                <>
                  {' '}
                  {t(navItem.title)}
                  <ArrowDropDownIcon />
                </>
              )}
            </Typography>
            {navItem.menuItems && (
              <HoverMenu
                {...(idx === 0 ? bindMenu(ethicalToursMenu) : {})}
                {...(idx === 1 ? bindMenu(spiritualToursMenu) : {})}
                {...(idx === 2 ? bindMenu(excursionsToursMenu) : {})}
                {...(idx === 3
                  ? bindMenu(destinationsToursMenu)
                  : {})}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                className={classes.MenuItem}
              >
                {navItem.menuItems.map((menuItem, index) => (
                  <Link
                    // * /tours/ethical?type=menuitem
                    key={menuItem}
                    // * /tours/destination/menuitem

                    to={`${navItem.path}${
                      menuItem === 'all'
                        ? (menuItem = '/')
                        : idx === 3
                        ? `/${menuItem}`
                        : idx === 0
                        ? index === 0
                          ? `?type=organized`
                          : index === 1
                          ? `?type=organic`
                          : index === 2
                          ? `?type=trains`
                          : `?type=cruises`
                        : `?type=${menuItem}`
                    }`}
                    style={{ textAlign: 'center' }}
                  >
                    <MenuItem>
                      {t(
                        menuItem === '/'
                          ? (menuItem = 'all')
                          : menuItem
                      )
                        .slice(0, 1)
                        .toUpperCase()}
                      {t(menuItem).slice(1)}
                      {/* {menuItem.slice(0, 1).toUpperCase()}
                      {menuItem.slice(1)} */}
                    </MenuItem>
                  </Link>
                ))}
              </HoverMenu>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default withRouter(Navbar);
