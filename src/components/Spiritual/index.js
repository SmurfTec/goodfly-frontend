import React, { useEffect, useContext, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TripCard from './TripCard';
import { styles } from 'Styles/FlashSale/FlashSaleStyles';
import TuneIcon from '@material-ui/icons/Tune';
import { useTheme } from '@material-ui/styles';
import Banner from 'components/common/tours/Banner';
import { ToursContext } from 'Contexts/ToursContext';
import useGlobalClasses from 'Hooks/useGlobalClasses';
import Page from 'components/common/Page';

import { useLocation, useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Paper, TextField } from '@material-ui/core';

const SpiritualHome = () => {
  const location = useLocation();
  const history = useHistory();
  const { tours } = useContext(ToursContext);
  const [spiritualTours, setSpiritualTours] = useState();
  const [currentTab, setCurrentTab] = useState(1);
  const theme = useTheme();
  const styleProps = {
    location,
    theme,
  };
  const globalClasses = useGlobalClasses();
  useEffect(() => {
    if (!tours || !tours.length === 0) {
      setSpiritualTours([]);
      return;
    }

    setSpiritualTours(tours.filter((el) => el.category === 'spiritual'));
  }, [tours]);

  const classes = styles(styleProps);

  //? Filter Menu State
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tripType, setTripType] = useState('all');

  const tripTypes = {
    options: ['all', 'hajj', 'omra', 'combine-hajj-omra', 'al-quds'],
    getOptionLabel: (option) => option,
  };

  const handleTripTypeChange = (event, value) => {
    setTripType(value);
  };

  useEffect(() => {
    switch (currentTab) {
      case 0:
        setSpiritualTours(
          tours?.filter(
            (tour) =>
              tour.category === 'spiritual' && tour.subCategory === 'hajj'
          )
        );
        break;
      case 1:
        setSpiritualTours(
          tours?.filter(
            (tour) =>
              tour.category === 'spiritual' && tour.subCategory === 'omra'
          )
        );
        break;
      case 2:
        setSpiritualTours(
          tours?.filter(
            (tour) =>
              tour.category === 'spiritual' && tour.subCategory === 'al-quds'
          )
        );
        break;
      case 3:
        setSpiritualTours(
          tours?.filter(
            (tour) =>
              tour.category === 'spiritual' &&
              tour.subCategory === 'combine-hajj-omra'
          )
        );
        break;

      default:
        setSpiritualTours(tours);
        break;
    }
  }, [currentTab]);

  useEffect(() => {
    if (!tours) return;
    if (tripType === 'all')
      setSpiritualTours(tours.filter((el) => el.category === 'spiritual'));
    else
      setSpiritualTours(
        tours?.filter(
          (el) => el.category === 'spiritual' && el.subCategory === tripType
        )
      );
  }, [tripType]);

  // ? Filter Menu open
  const filterMenuOpen = (e) => {
    console.log('clicked');
    e.preventDefault();
    e.stopPropagation();
    console.log(`e.currentTarget`, e.currentTarget);
    setAnchorEl(e.currentTarget);
  };

  return (
    <Page title='GoodFly |  Spiritual Tours'>
      <CssBaseline />

      <Container className={globalClasses.MainContainer} maxWidth='lg'>
        <div className={globalClasses.heroContent}>
          <Banner
            imageUrl={
              'https://m.hziegler.com/hza-resized-images/articles/hajj/mecca-at-night_450x300.jpg'
            }
            bannerTitle={`${currentTab === 1 ? 'Omra' : 'Hajj'} Offers`}
            align='center'
          />

          <section className={classes.filter}>
            <Button
              variant='outlined'
              startIcon={<TuneIcon />}
              // onMouseOver={filterMenuOpen}
              onClick={filterMenuOpen}
              sx={{ cursor: 'pointer' }}
            >
              Select a filter
            </Button>

            <Autocomplete
              {...tripTypes}
              id='disable-clearable'
              disableClearable
              value={tripType}
              onChange={handleTripTypeChange}
              PaperComponent={({ children }) => (
                <Paper color='primary'>{children}</Paper>
              )}
              clearOnEscape
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Filter by Type'
                  margin='normal'
                  size='small'
                  color='primary'
                />
              )}
            />
          </section>
        </div>
        {/* End hero unit */}
        <Typography variant='h5' color='textSecondary' align='left'>
          Do you have a few days ahead of you? Découvrez les ventes
        </Typography>
        <Typography
          variant='h5'
          color='textSecondary'
          align='left'
          style={{
            marginBottom: '2rem',
          }}
        >
          Flash GOODFLY : les plans dernière minute à prix cassés.
        </Typography>
        {/* Upper GridView */}
        <Grid container spacing={4}>
          {spiritualTours ? (
            spiritualTours.length > 0 ? (
              spiritualTours.map((tour) => (
                <Grid item key={tour._id} xs={12} sm={6} md={4}>
                  <TripCard tour={tour} />
                </Grid>
              ))
            ) : (
              <Box mt={5}>
                <Typography variant='h4'>No Tours Yet !</Typography>
              </Box>
            )
          ) : (
            <div className='loader'></div>
          )}
        </Grid>

        {/* Space Container */}
        <div className={classes.spaceSection}>
          <Typography variant='h5'>PUB SPACE</Typography>
        </div>
      </Container>
    </Page>
  );
};
export default SpiritualHome;
