import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyles from 'Styles/Home/TabStyles';
import FlightIcon from '@material-ui/icons/FlightTakeoff';
import HotelIcon from '@material-ui/icons/Apartment';
import VehicleIcon from '@material-ui/icons/DriveEta';
import BoatIcon from '@material-ui/icons/DirectionsBoat';
import TrainIcon from '@material-ui/icons/Train';

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role='tabpanel'
         hidden={value !== index}
         id={`scrollable-auto-tabpanel-${index}`}
         aria-labelledby={`scrollable-auto-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box p={3}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

function a11yProps(index) {
   return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
   };
}

export default function ScrollableTabsButtonAuto() {
   const classes = useStyles();
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   function content9() {
      return (
         <div>
            Brisbane, capital of Queensland, is a large city on the
            Brisbane River.
         </div>
      );
   }

   return (
      <div className={classes.root}>
         <AppBar position='static' color='default'>
            <Tabs
               value={value}
               onChange={handleChange}
               indicatorColor='primary'
               textColor='primary'
               variant='scrollable'
               scrollButtons='auto'
               aria-label='scrollable auto tabs example'
            >
               <Tab
                  label='Flight'
                  {...a11yProps(0)}
                  icon={<FlightIcon />}
               />
               <Tab
                  label='Hotel'
                  {...a11yProps(1)}
                  icon={<HotelIcon />}
               />
               <Tab
                  label='Vehicle'
                  {...a11yProps(2)}
                  icon={<VehicleIcon />}
               />
               <Tab
                  label='Boats'
                  {...a11yProps(3)}
                  icon={<BoatIcon />}
               />
               <Tab
                  label='Trains'
                  {...a11yProps(4)}
                  icon={<TrainIcon />}
               />
            </Tabs>
         </AppBar>
         <TabPanel
            className={classes.TabPanel}
            value={value}
            index={0}
         >
            <Tabs
               value={value}
               onChange={handleChange}
               indicatorColor='primary'
               textColor='primary'
               variant='scrollable'
               scrollButtons='auto'
               aria-label='scrollable auto tabs example'
            >
               <Tab label='One way' {...a11yProps(5)} />
               <Tab label='Round Trip' {...a11yProps(6)} />
            </Tabs>
            <TabPanel
               className={classes.TabPanel}
               value={value}
               index={5}
            >
               One way
            </TabPanel>
            <TabPanel
               className={classes.TabPanel}
               value={value}
               index={6}
            >
               Round Trip
            </TabPanel>
         </TabPanel>
         <TabPanel
            className={classes.TabPanel}
            value={value}
            index={1}
         >
            Item Two
         </TabPanel>
         <TabPanel
            className={classes.TabPanel}
            value={value}
            index={2}
         >
            Item Three
         </TabPanel>
         <TabPanel
            className={classes.TabPanel}
            value={value}
            index={3}
         >
            Item Four
         </TabPanel>
         <TabPanel
            className={classes.TabPanel}
            value={value}
            index={4}
         >
            Item Five
         </TabPanel>
      </div>
   );
}
