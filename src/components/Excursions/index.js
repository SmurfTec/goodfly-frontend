import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TripCard from './TripCard';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { styles } from 'Styles/FlashSale/FlashSaleStyles';
import TuneIcon from '@material-ui/icons/Tune';
import Advisor from './Adivsor';
import { useTheme } from '@material-ui/styles';
import { ToursContext } from 'Contexts/ToursContext';
import useGlobalClasses from 'Hooks/useGlobalClasses';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { Paper, TextField } from '@material-ui/core';

const options = ['Price', 'Date', 'Duration', 'Best Score'];

const ExcursionaHome = ({ location }) => {
  const { tours } = useContext(ToursContext);
  const globalClasses = useGlobalClasses();
  const [excursionTours, setExcursionTours] = useState();
  const [tripType, setTripType] = React.useState('organized');
  const theme = useTheme();
  const styleProps = {
    location,
    theme,
  };

  useEffect(() => {
    if (!tours || !tours.length === 0) {
      setExcursionTours([]);
      return;
    }

    setExcursionTours(
      tours.filter((el) => el.category === 'excursions')
    );
  }, [tours]);

  useEffect(() => {
    if (!tours) return;
    if (tripType === 'all')
      setExcursionTours(
        tours?.filter((el) => el.category === 'excursions')
      );
    else
      setExcursionTours(
        tours?.filter(
          (el) =>
            el.category === 'excursions' &&
            el.subCategory === tripType
        )
      );
  }, [tripType]);

  const defaultProps = {
    options: ['all', 'organized', 'organic'],
    getOptionLabel: (option) => option,
  };

  const handleTripTypeChange = (event, value) => {
    setTripType(value);
  };
  const classes = styles(styleProps);

  //? Filter Menu State
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  //? Closing filter menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ? Filter Menu open
  const filterMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  //? Filter Item selected
  const filterSelected = (e) => {
    //? Got the selected filter value, uncomment below line
    const { filter } = e.currentTarget.dataset;
    // console.log(filter);

    switch (filter.toLowerCase()) {
      case 'price': {
        setExcursionTours((st) => {
          let sortedTours = st;
          sortedTours.sort((a, b) => (a.price > b.price ? -1 : 1));
          return sortedTours;
        });
        break;
      }
      case 'duration': {
        setExcursionTours((st) => {
          let sortedTours = st;
          sortedTours.sort((a, b) =>
            a.duration > b.duration ? -1 : 1
          );
          return sortedTours;
        });
        break;
      }
      case 'date': {
        setExcursionTours((st) => {
          let sortedTours = st;
          sortedTours.sort((a, b) =>
            new Date(a.startingDate) > new Date(b.startingDate)
              ? -1
              : 1
          );
          return sortedTours;
        });
        break;
      }
      default: {
        setExcursionTours((st) => {
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

  return (
    <React.Fragment>
      <CssBaseline />

      {/* Hero unit */}
      <Container
        className={globalClasses.MainContainer}
        maxWidth='lg'
      >
        <div className={globalClasses.heroContent}>
          <Container className={classes.mainFeaturedPost}>
            <section className={classes.title}>
              <Typography variant='h3'>
                Excursions and Circuits
                <FlashOnIcon sx={{ marginLeft: 2 }} />
              </Typography>
            </section>
            <Advisor />
          </Container>

          <section className={classes.filter}>
            <Button
              variant='outlined'
              startIcon={<TuneIcon />}
              onClick={filterMenuOpen}
            >
              Select a filter
            </Button>

            <Autocomplete
              {...defaultProps}
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
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
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
          {excursionTours ? (
            excursionTours.length > 0 ? (
              excursionTours.map((tour) => (
                <Grid item key={tour._id} xs={12} sm={6} md={4}>
                  <TripCard {...tour} />
                </Grid>
              ))
            ) : (
              <Typography variant='h4'>No Tours Yet !</Typography>
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
    </React.Fragment>
  );
};
export default withRouter(ExcursionaHome);
