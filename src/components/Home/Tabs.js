import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyles from 'Styles/Home/TabStyles';
import FlightTabItem from './FlightTabItem';
import FlightIcon from '@material-ui/icons/FlightTakeoff';
import HotelIcon from '@material-ui/icons/Apartment';
import VehicleIcon from '@material-ui/icons/DriveEta';
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
   const [tripOption, setTripOption] = React.useState(0);

   //? State for no of passengers set for booking
   const [passgrSelecn, setpassgrSelec] = React.useState('');

   //? State for no of passengers set for booking
   const [roomOptions, setRoomOptions] = React.useState('');

   //? Select no of passengers from select menu
   const handleRoomOptions = (event) => {
      setRoomOptions(event.target.value);
   };

   //? Tabs onChange func
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   //? Set the selected trip option, one way or round trip
   const setSelectedOption = (e) => {
      const { option } = e.currentTarget.dataset;
      if (option === 'roundTrip') setTripOption(0);
      else setTripOption(1);
   };

   //? Select no of passengers from select menu
   const handlePassengers = (event) => {
      setpassgrSelec(event.target.value);
   };

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
            </Tabs>
         </AppBar>
         <TabPanel
            className={classes.TabPanel}
            value={value}
            index={0}
         >
            <FlightTabItem />
         </TabPanel>
         <TabPanel
            className={classes.TabPanel}
            value={value}
            index={1}
         >
            <section className={classes.tabItemOptions}>
               <Typography
                  variant='body1'
                  data-option='roundTrip'
                  className={classes.tabItem}
               >
                  Where do you stay ?
               </Typography>
            </section>
            <Grid container sx={{ marginTop: 3 }} spacing={2}>
               <Grid item xs={12} sm={12}>
                  <label className={classes.label}>Destination</label>
                  <input
                     className={classes.textInput}
                     type='text'
                     placeholder='Name of hotel or city'
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <label className={classes.label}>Check-in</label>
                  <input
                     id='chkInDate'
                     type='date'
                     className={classes.textInput}
                     defaultValue='2021-10-24'
                     InputLabelProps={{
                        shrink: true,
                     }}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <label className={classes.label}>Check-out</label>
                  <input
                     id='chkOutDate'
                     type='date'
                     className={classes.textInput}
                     defaultValue='2021-10-24'
                     InputLabelProps={{
                        shrink: true,
                     }}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <label className={classes.label}>Passengers</label>
                  <Select
                     onChange={handleRoomOptions}
                     displayEmpty
                     value={roomOptions}
                     sx={{
                        backgroundColor: '#fff',
                        width: '100%',
                        '& .MuiInputBase-input': {
                           padding: '9px 20px',
                        },
                     }}
                  >
                     <MenuItem value=''>
                        <em>1 room, 1 adult only</em>
                     </MenuItem>
                     <MenuItem value={1}>
                        1 room, 2 adult only
                     </MenuItem>
                     <MenuItem value={2}>2 rooms, 4 adults</MenuItem>
                  </Select>
               </Grid>
               <Grid item sx={{ marginTop: 2 }} xs={12}>
                  <Button variant='contained' color='primary'>
                     Search Hotels
                  </Button>
               </Grid>
            </Grid>
         </TabPanel>
         <TabPanel
            className={classes.TabPanel}
            value={value}
            index={2}
         >
            <section className={classes.tabItemOptions}>
               <Typography
                  variant='body1'
                  data-option='roundTrip'
                  className={classes.tabItem}
               >
                  Vehicle Rental for any type of Trip
               </Typography>
            </section>
            <Grid container sx={{ marginTop: 2 }} spacing={2}>
               <Grid item sm={12}>
                  <section className={classes.tabItemOptions}>
                     <Typography
                        variant='body1'
                        data-option='roundTrip'
                        className={classes.tabItem}
                        onClick={setSelectedOption}
                        sx={{ marginRight: 3 }}
                     >
                        Same drop off
                        <span
                           className={`${classes.slider} ${
                              tripOption === 0 &&
                              classes.selectedOption
                           }`}
                        ></span>
                     </Typography>
                     <Typography
                        variant='body1'
                        data-option='oneway'
                        className={classes.tabItem}
                        onClick={setSelectedOption}
                     >
                        Different drop off
                        <span
                           className={`${classes.slider} ${
                              tripOption === 1 &&
                              classes.selectedOption
                           }`}
                        ></span>
                     </Typography>
                  </section>
               </Grid>
               <Grid item xs={12} sm={12}>
                  <label className={classes.label}>
                     Pickup location
                  </label>
                  <input
                     className={classes.textInput}
                     type='text'
                     placeholder='City or Airport'
                  />
               </Grid>
               {tripOption === 1 && (
                  <>
                     <Grid item xs={12} sm={12}>
                        <label className={classes.label}>
                           Drop Off location
                        </label>
                        <input
                           className={classes.textInput}
                           type='text'
                           placeholder='City or Airport'
                        />
                     </Grid>
                  </>
               )}
               <Grid item xs={12} sm={6}>
                  <label className={classes.label}>Pick-up</label>
                  <input
                     id='pickUpDateTime'
                     type='datetime-local'
                     defaultValue='2017-05-24T10:30'
                     className={classes.textInput}
                     InputLabelProps={{
                        shrink: true,
                     }}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <label className={classes.label}>Drop-off</label>
                  <input
                     id='dropOffDateTime'
                     type='datetime-local'
                     defaultValue='2017-05-24T10:30'
                     className={classes.textInput}
                     InputLabelProps={{
                        shrink: true,
                     }}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <label className={classes.label}>Passengers</label>

                  <Select
                     onChange={handlePassengers}
                     displayEmpty
                     value={passgrSelecn}
                     sx={{
                        backgroundColor: '#fff',
                        width: '100%',
                        '& .MuiInputBase-input': {
                           padding: '9px 20px',
                        },
                     }}
                  >
                     <MenuItem value=''>
                        <em>1</em>
                     </MenuItem>
                     <MenuItem value={20}>2</MenuItem>
                     <MenuItem value={30}>3</MenuItem>
                     <MenuItem value={30}>4</MenuItem>
                     <MenuItem value={30}>5</MenuItem>
                     <MenuItem value={30}>6</MenuItem>
                     <MenuItem value={30}>6+</MenuItem>
                  </Select>
               </Grid>
               <Grid
                  item
                  sx={{ marginTop: 4, textAlign: 'right' }}
                  xs={12}
                  sm={6}
               >
                  <Button variant='contained' color='primary'>
                     Start a reseach
                  </Button>
               </Grid>
            </Grid>
         </TabPanel>
      </div>
   );
}
