import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FlashCard from './FlashCard';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { styles } from 'Styles/FlashSale/FlashSaleStyles';
import TuneIcon from '@material-ui/icons/Tune';
import Advisor from './Adivsor';

import { useTheme } from '@material-ui/styles';
import { ToursContext } from 'Contexts/ToursContext';

const options = ['Price', 'Date', 'Duration', 'Best Score'];

const FlashSale = ({ location }) => {
  const theme = useTheme();

  const { tours } = useContext(ToursContext);
  const [flashSales, setFlashSales] = useState();

  useEffect(() => {
    if (!tours || !tours.length === 0) {
      setFlashSales([]);
      return;
    }

    setFlashSales(tours.filter((el) => el.sale));
  }, [tours]);

  const classes = styles({ location: location, theme: theme });

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
        setFlashSales((st) => {
          let sortedTours = st;
          sortedTours.sort((a, b) => (a.price > b.price ? -1 : 1));
          return sortedTours;
        });
        break;
      }
      case 'duration': {
        setFlashSales((st) => {
          let sortedTours = st;
          sortedTours.sort((a, b) =>
            a.duration > b.duration ? -1 : 1
          );
          return sortedTours;
        });
        break;
      }
      case 'date': {
        setFlashSales((st) => {
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
        setFlashSales((st) => {
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

      <main className={classes.root}>
        {/* Hero unit */}
        <Container className={classes.cardGrid} maxWidth='lg'>
          <div className={classes.heroContent}>
            <Container className={classes.mainFeaturedPost}>
              <section className={classes.title}>
                <Typography variant='h3'>
                  FLASH SALE
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
            {flashSales ? (
              flashSales.length > 0 ? (
                flashSales.map((tour) => (
                  <Grid item key={tour._id} xs={12} sm={6} md={4}>
                    <FlashCard {...tour} />
                  </Grid>
                ))
              ) : (
                <Box mt={5}>
                  <Typography variant='h4'>
                    No Flash Sales Available Now !
                  </Typography>
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
      </main>
    </React.Fragment>
  );
};
export default withRouter(FlashSale);
