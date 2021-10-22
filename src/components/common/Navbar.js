import React from 'react';

import { Typography, Button } from '@material-ui/core';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import HoverMenu from 'material-ui-popup-state/HoverMenu';

import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';

import useStyles from 'Styles/Navbar';
import NavbarData from './NavbarData';

const Navbar = ({ location }) => {
  const classes = useStyles();
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

  React.useEffect(() => {
    console.log('rerendered');
  });
  return (
    <nav className={classes.nav}>
      {NavbarData.map((navItem, idx) => {
        return (
          <React.Fragment key={idx}>
            <Typography
              variant='p'
              color='primary.dark'
              style={{
                color: location.pathname.includes(navItem.path) && '#fa0f0c',
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
                  {navItem.title}
                </NavLink>
              ) : (
                <>{navItem.title}</>
              )}
            </Typography>
            {navItem.menuItems && (
              <HoverMenu
                {...(idx === 0 ? bindMenu(ethicalToursMenu) : {})}
                {...(idx === 1 ? bindMenu(spiritualToursMenu) : {})}
                {...(idx === 2 ? bindMenu(excursionsToursMenu) : {})}
                {...(idx === 3 ? bindMenu(destinationsToursMenu) : {})}
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
                {navItem.menuItems.map((menuItem) => (
                  <MenuItem key={menuItem}>
                    <Link
                      // * /tours/ethical?type=menuitem

                      // * /tours/destination/menuitem
                      to={`${navItem.path}${
                        idx === 3 ? `/${menuItem}` : `?type=${menuItem}`
                      }`}
                      style={{ textAlign: 'center' }}
                    >
                      {menuItem.slice(0, 1).toUpperCase()}
                      {menuItem.slice(1)}
                    </Link>
                  </MenuItem>
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
