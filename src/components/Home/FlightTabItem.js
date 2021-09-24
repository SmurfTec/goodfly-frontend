import React, { useState } from 'react';
import {
   Button,
   Typography,
   Grid,
   Select,
   MenuItem,
   FormControlLabel,
   Checkbox,
} from '@material-ui/core';
import usestyles from 'Styles/Home/TabStyles';

const TabItem = () => {
   const classes = usestyles();
   const [tripOption, setTripOption] = useState(0);
   //? State for no of passengers set for booking
   const [passgrSelecn, setpassgrSelec] = React.useState('');
   //? State for direct flight checkbox
   const [directFlight, setdirectFlight] = React.useState(false);

   //? Set the selected trip option, one way or round trip
   const setSelectedOption = (e) => {
      const { option } = e.currentTarget.dataset;
      if (option === 'roundTrip') setTripOption(0);
      else setTripOption(1);
   };

   //? Select no of passengers from select menu
   const handleChange = (event) => {
      setpassgrSelec(event.target.value);
   };

   //? Direct flight checkox
   const directFlightChk = (e) => {
      setdirectFlight(!directFlight);
   };

   return (
      <>
         <section className={classes.tabItemOptions}>
            <Typography
               variant='body1'
               data-option='roundTrip'
               className={classes.tabItem}
               onClick={setSelectedOption}
               sx={{ marginRight: 3 }}
            >
               Round Trip
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
               One Way Ticket
               <span
                  className={`${classes.slider} ${
                     tripOption === 1 && classes.selectedOption
                  }`}
               ></span>
            </Typography>
         </section>
         <Grid container sx={{ marginTop: 3 }} spacing={2}>
            <Grid item xs={12} sm={6}>
               <label className={classes.label}>Departure</label>
               <input
                  className={classes.textInput}
                  type='text'
                  placeholder='Where are we going from?'
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <label className={classes.label}>Destination</label>
               <input
                  className={classes.textInput}
                  type='text'
                  placeholder='Where are we going ?'
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <label className={classes.label}>To Go</label>
               <input
                  id='date'
                  type='date'
                  className={classes.textInput}
                  defaultValue='2021-10-24'
                  InputLabelProps={{
                     shrink: true,
                  }}
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               {tripOption === 1 && (
                  <>
                     <label className={classes.label}>Return</label>
                     <input
                        id='date'
                        type='date'
                        className={classes.textInput}
                        defaultValue='2021-10-24'
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />
                  </>
               )}
            </Grid>

            <Grid item xs={12} sm={6}>
               <label className={classes.label}>Passengers</label>
               <Select
                  onChange={handleChange}
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
                     <em>1 adult only</em>
                  </MenuItem>
                  <MenuItem value={20}>2 adults</MenuItem>
                  <MenuItem value={30}>3 adults</MenuItem>
               </Select>
            </Grid>
            <Grid
               item
               xs={12}
               sm={6}
               sx={{ display: 'flex', alignItems: 'end' }}
            >
               <FormControlLabel
                  value='direct'
                  control={
                     <Checkbox
                        color='primary'
                        checked={directFlight}
                        onChange={directFlightChk}
                     />
                  }
                  label='Direct Flights Only'
                  labelPlacement='end'
                  align='center'
                  sx={{ height: 'inherit', textAlign: 'left' }}
               />
            </Grid>
            <Grid item sx={{ marginTop: 2 }} sm={12}>
               <Button variant='contained' color='primary'>
                  Start a reseach
               </Button>
            </Grid>
         </Grid>
      </>
   );
};

export default TabItem;
