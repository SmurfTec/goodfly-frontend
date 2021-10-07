import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyles from 'Styles/Home/TabStyles';
import FlightTabItem from './FlightTabItem';
import FlightIcon from '@material-ui/icons/FlightTakeoff';
import HotelIcon from '@material-ui/icons/Apartment';
import VehicleIcon from '@material-ui/icons/DriveEta';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import {
  CustomInputField,
  CustomDatePicker,
} from 'components/FormControls';

const selectStyles = {
  option: (styles, { isSelected }) => {
    return {
      ...styles,
      color: '#000',
      backgroundColor: isSelected ? '#F4F6F8' : '#fff',
      '&:hover': {
        backgroundColor: '#F4F6F8',
      },
    };
  },
};

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
  // const [tripOption, setTripOption] = React.useState(0);
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm();

  //? State for no of passengers set for booking
  // const [passgrSelecn, setpassgrSelec] = React.useState('');

  //? State for no of passengers set for booking
  // const [roomOptions, setRoomOptions] = React.useState('');

  //? Select no of passengers from select menu
  // const handleRoomOptions = (event) => {
  //   setRoomOptions(event.target.value);
  // };

  //? Tabs onChange func
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //? Set the selected trip option, one way or round trip
  // const setSelectedOption = (e) => {
  //   const { option } = e.currentTarget.dataset;
  //   if (option === 'roundTrip') setTripOption(0);
  //   else setTripOption(1);
  // };

  //? Select no of passengers from select menu
  // const handlePassengers = (event) => {
  //   setpassgrSelec(event.target.value);
  // };

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
          <Tab label='Hotel' {...a11yProps(1)} icon={<HotelIcon />} />
          <Tab
            label='Vehicle'
            {...a11yProps(2)}
            icon={<VehicleIcon />}
          />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.TabPanel} value={value} index={0}>
        <FlightTabItem />
      </TabPanel>
      <TabPanel className={classes.TabPanel} value={value} index={1}>
        <section className={classes.tabItemOptions}>
          <Typography
            variant='body1'
            data-option='roundTrip'
            className={classes.tabItem}
          >
            Where do you stay ?
          </Typography>
        </section>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Grid container sx={{ marginTop: 3 }} spacing={2}>
            <Grid item xs={12} sm={12}>
              <CustomInputField
                name='destination'
                label='Destination'
                type='text'
                register={register}
                errors={errors}
                errorMessage='Specify name of city or hotel'
                placeholder='Name of hotel or city'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomDatePicker
                type='date'
                label='Check-in'
                name='chkInDate'
                errors={errors}
                errorMessage='Specify the check in date'
                register={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomDatePicker
                type='date'
                label='Check-Out'
                name='chkOutDate'
                errors={errors}
                errorMessage='Specify the check out date'
                register={register}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <>
                <Typography variant='body2' sx={{ mt: 2, mb: 1 }}>
                  Passengers
                </Typography>

                <Controller
                  name='passengersRoom'
                  control={control}
                  defaultValue={{
                    value: '1 room, 1 adult only',
                    label: '1 room, 1 adult only',
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={false}
                      placeholder='Passengers'
                      styles={selectStyles}
                      options={[
                        {
                          key: 11,
                          value: '1 room, 1 adult only',
                          label: '1 room, 1 adult only',
                        },
                        {
                          key: 12,
                          value: '1 room, 2 adults only',
                          label: '1 room, 2 adults only',
                        },
                        {
                          key: 13,
                          value: '2 rooms, 4 adults',
                          label: '2 room, 4 adults',
                        },
                      ]}
                    />
                  )}
                />
              </>
            </Grid>
            <Grid item sx={{ marginTop: 2 }} xs={12}>
              <Button
                variant='contained'
                color='primary'
                type='submit'
              >
                Search Hotels
              </Button>
            </Grid>
          </Grid>
        </form>
      </TabPanel>
      <TabPanel className={classes.TabPanel} value={value} index={2}>
        <section className={classes.tabItemOptions}>
          <Typography
            variant='body1'
            data-option='roundTrip'
            className={classes.tabItem}
          >
            Vehicle Rental for any type of Trip
          </Typography>
        </section>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Grid container sx={{ marginTop: 2 }} spacing={2}>
            {/* <Grid item sm={12}>
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
                    tripOption === 0 && classes.selectedOption
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
                    tripOption === 1 && classes.selectedOption
                  }`}
                ></span>
              </Typography>
            </section>
          </Grid> */}
            <Grid item xs={12} sm={6}>
              <CustomInputField
                name='pickupLocation'
                label='Pickup location'
                type='text'
                register={register}
                errors={errors}
                errorMessage='Specify your pickup location (airport or city)'
                placeholder='City or Airport'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInputField
                name='dropOffLocation'
                label='Drop Off location'
                type='text'
                register={register}
                errors={errors}
                errorMessage='Specify your dropoff location hotel etc'
                placeholder='Hotel or any location'
              />
            </Grid>
            {/* {tripOption === 1 && (
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
          )} */}
            <Grid item xs={12} sm={12}>
              <CustomDatePicker
                type='datetime-local'
                label='Pickup Date & Time'
                name='pickupDateTime'
                errors={errors}
                errorMessage='Specify the pickup date & time'
                register={register}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
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
            <CustomDatePicker
              type='date'
              label='Dropoff Date & Time'
              name='chkOutDate'
              errors={errors}
              errorMessage='Specify the check out date'
              register={register}
            />
          </Grid> */}
            <Grid item xs={12} sm={6}>
              <>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  Passengers
                </Typography>

                <Controller
                  name='passengersRoom'
                  control={control}
                  defaultValue={{
                    value: '1',
                    label: '1',
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={false}
                      placeholder='Passengers'
                      styles={selectStyles}
                      options={[
                        {
                          key: 111,
                          value: '1',
                          label: '1',
                        },
                        {
                          key: 122,
                          value: '2',
                          label: '2',
                        },
                        {
                          key: 133,
                          value: '3',
                          label: '3',
                        },
                      ]}
                    />
                  )}
                />
              </>
            </Grid>
            <Grid
              item
              sx={{ marginTop: 4, textAlign: 'right' }}
              xs={12}
              sm={6}
            >
              <Button
                variant='contained'
                color='primary'
                type='submit'
              >
                Start a reseach
              </Button>
            </Grid>
          </Grid>
        </form>
      </TabPanel>
    </div>
  );
}
