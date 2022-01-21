import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import SwipeableViews from 'react-swipeable-views';

// --------- MUI ----------- //
import { makeStyles, useTheme } from '@material-ui/styles';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import PersonalInfo from './PersonalInfo';
import FavouritiesTab from './FavouritiesTab';
import TripsTab from './TripsTabs';
import PurchasesTab from './PurchasesTab';
import { StoreContext } from 'Contexts/StoreContext';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

// ------------------------ //

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    backgroundColor: '#fafafa',
    '& .MuiTabs-flexContainer': {
      // justifyContent: 'space-around',
      '& .MuiTab-root': {
        minWidth: 100,
        flexGrow: 1,
        backgroundColor: '#e6e6e6',
        color: '#808080',
      },
    },
    '& .MuiTabs-indicator': {
      backgroundColor: 'unset',
    },
    '& .Mui-selected': {
      backgroundColor: '#fafafa !important',
      color: '#000 !important',
    },
    '& .MuiTab-wrapper': {
      textTransform: 'capitalize',
    },
  },
  TabPanel: {
    backgroundColor: '#fafafa',
    color: '#000',
    //   height: '90%',
  },
}));

const ProfileTabs = ({ user }) => {
  const classes = useStyles();
  const { userOrders } = useContext(StoreContext);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  const handleChange = (event, newValue) => {
    // setValue(newValue);
    history.push(`?tab=${newValue}`);
  };

  const handleChangeIndex = (index) => {
    // setValue(index);
    history.push(`?tab=${index}`);
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('tab');
    console.log(`query`, query);

    if (!query) return;

    if (['0', '1', '2', '3'].includes(query.toLowerCase())) {
      console.log(`setting tabs`);
      setValue(parseInt(query));
    }
  }, [location.search]);

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor=''
          textColor='textPrimary'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          <Tab label={t('Personal Informations')} {...a11yProps(0)} />
          <Tab label={t('My Favourites')} {...a11yProps(1)} />
          <Tab label={t('My Trips')} {...a11yProps(2)} />
          <Tab label={t('My Purchases')} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          className={classes.TabPanel}
          value={value}
          index={0}
          dir={theme.direction}
        >
          <PersonalInfo user={user} />
        </TabPanel>
        <TabPanel
          className={classes.TabPanel}
          value={value}
          index={1}
          dir={theme.direction}
        >
          <FavouritiesTab trips={user.favourities} />
        </TabPanel>
        <TabPanel
          className={classes.TabPanel}
          value={value}
          index={2}
          dir={theme.direction}
        >
          <TripsTab
            trips={
              user.Purchases?.filter(
                (el) => el.status === 'reservation-paid'
              ) || []
            }
          />
        </TabPanel>
        <TabPanel
          className={classes.TabPanel}
          value={value}
          index={3}
          dir={theme.direction}
        >
          <PurchasesTab orders={userOrders} purchases={user.Purchases} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default ProfileTabs;
