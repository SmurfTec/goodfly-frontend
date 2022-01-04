import React, { useEffect, useContext, useState, useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
import { Menu, MenuItem, Paper, TextField } from '@material-ui/core';
import PaginationBar from 'components/common/Pagination';

const TOURS_PER_PAGE = 12;
const options = ['Price', 'Date', 'Duration', 'Best Score'];

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

  // * Pagination
  const [page, setPage] = React.useState(1);
  const DataCount = useMemo(() => {
    if (!spiritualTours) return;

    // *  total pages  = (total spiritualTours / spiritualTours per page )+ 1
    return Math.ceil(spiritualTours.length / TOURS_PER_PAGE);
  }, [spiritualTours]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // * ------------ *  //

  //? Filter Item selected
  const filterSelected = (e) => {
    //? Got the selected filter value, uncomment below line
    const { filter } = e.currentTarget.dataset;
    // console.log(filter);

    switch (filter.toLowerCase()) {
      case 'price': {
        setSpiritualTours((st) => {
          let sortedTours = st;
          sortedTours.sort((a, b) => (a.price > b.price ? -1 : 1));
          return sortedTours;
        });
        break;
      }
      case 'duration': {
        setSpiritualTours((st) => {
          let sortedTours = st;
          sortedTours.sort((a, b) => (a.duration > b.duration ? -1 : 1));
          return sortedTours;
        });
        break;
      }
      case 'date': {
        setSpiritualTours((st) => {
          let sortedTours = st;
          sortedTours.sort((a, b) =>
            new Date(a.startingDate) > new Date(b.startingDate) ? -1 : 1
          );
          return sortedTours;
        });
        break;
      }
      default: {
        setSpiritualTours((st) => {
          let sortedTours = st;
          sortedTours.sort((a, b) =>
            a.reviews.length > 0 &&
            a.reviews?.reduce((x, y) => 0 + y.rating) * 1 >
              b.reviews.length >
              0 &&
            b.reviews?.reduce((x, y) => 0 + y.rating) * 1
              ? -1
              : 1
          );
          return sortedTours;
        });
        break;
      }
    }

    setAnchorEl(null);
  };

  //? Filter Menu State
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tripType, setTripType] = useState('all');
  //? Filter Menu State
  const open = Boolean(anchorEl);

  //? Closing filter menu
  const handleClose = () => {
    setAnchorEl(null);
  };
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
            <Menu
              id='long-menu'
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              // MenuListProps={{ onMouseLeave: handleClose }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={index}
                  data-filter={option}
                  onClick={filterSelected}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
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
              spiritualTours
                ?.slice(
                  (page - 1) * TOURS_PER_PAGE,
                  (page - 1) * TOURS_PER_PAGE + TOURS_PER_PAGE
                )
                .slice(0, 6)
                .map((tour) => (
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
        <div className={globalClasses.spaceSection}>
          <Typography variant='h5'>PUB SPACE</Typography>
        </div>

        <Grid container spacing={4}>
          {spiritualTours
            ?.slice(
              (page - 1) * TOURS_PER_PAGE,
              (page - 1) * TOURS_PER_PAGE + TOURS_PER_PAGE
            )
            ?.slice(6)
            .map((tour) => (
              <Grid item key={tour._id} xs={12} sm={6} md={4}>
                <TripCard tour={tour} />
              </Grid>
            ))}
        </Grid>

        {spiritualTours?.length > 0 && (
          <PaginationBar
            page={page}
            count={DataCount}
            onChange={handleChangePage}
          />
        )}
      </Container>
    </Page>
  );
};
export default SpiritualHome;
