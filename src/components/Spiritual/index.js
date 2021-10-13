import React, { useEffect, useContext, useState } from 'react';
import { withRouter } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TripCard from './TripCard';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { styles } from 'Styles/FlashSale/FlashSaleStyles';
import TuneIcon from '@material-ui/icons/Tune';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Advisor from './Adivsor';
import { useTheme } from '@material-ui/styles';
import Banner from 'components/common/Banner';
import { ToursContext } from 'Contexts/ToursContext';

const options = ['Price', 'Date', 'Duration', 'Best Score'];

const SpiritualHome = ({ location }) => {
  const { tours } = useContext(ToursContext);
  const [spiritualTours, setSpiritualTours] = useState();
  const [currentTab, setCurrentTab] = useState(1);
  const theme = useTheme();
  const styleProps = {
    location,
    theme,
  };

  useEffect(() => {
    if (!tours || !tours.length === 0) {
      setSpiritualTours([]);
      return;
    }

    setSpiritualTours(
      tours.filter((el) => el.category === 'spiritual')
    );
  }, [tours]);

  const classes = styles(styleProps);
  const handleTab = (st) => {
    setCurrentTab(st);
  };

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
          sortedTours.sort((a, b) =>
            a.duration > b.duration ? -1 : 1
          );
          return sortedTours;
        });
        break;
      }
      case 'date': {
        setSpiritualTours((st) => {
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

  return (
    <React.Fragment>
      <CssBaseline />

      <main className={classes.root}>
        {/* Hero unit */}

        <Container className={classes.cardGrid} maxWidth='lg'>
          <div className={classes.heroContent}>
            {/* <Container className={classes.mainFeaturedPost}>
              <section className={classes.title}>
                <Typography variant='h3'>
                  Ethical Travel
                  <FlashOnIcon sx={{ marginLeft: 2 }} />
                </Typography>
              </section>
              <Advisor />
            </Container> */}

            <Banner
              imageUrl={
                'https://m.hziegler.com/hza-resized-images/articles/hajj/mecca-at-night_450x300.jpg'
              }
              bannerTitle={`${
                currentTab === 1 ? 'Omra' : 'Hajj'
              } Offers`}
              align='center'
            />

            <section className={classes.filter}>
              <Button
                variant='outlined'
                startIcon={<TuneIcon />}
                onClick={filterMenuOpen}
                color='inherit'
                style={{
                  marginRight: '14rem',
                }}
              >
                Select a filter
              </Button>
              <Box>
                <Button
                  variant='outlined'
                  onClick={filterMenuOpen}
                  color='inherit'
                  style={{}}
                  onClick={handleTab.bind(this, 1)}
                  style={{
                    color: currentTab === 1 ? '#000' : '#ccc',
                    borderColor: currentTab === 1 ? '#000' : '#ccc',
                    marginRight: '2rem',
                  }}
                >
                  OMRA OFFERS
                </Button>
                <Button
                  variant='outlined'
                  onClick={filterMenuOpen}
                  textSecondary
                  color='inherit'
                  onClick={handleTab.bind(this, 0)}
                  style={{
                    color: currentTab === 0 ? '#000' : '#ccc',
                    borderColor: currentTab === 0 ? '#000' : '#ccc',
                  }}
                >
                  HAJJ OFFERS
                </Button>
              </Box>
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
                    HAJJ OFFERS
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
                spiritualTours.map((card) => (
                  <Grid item key={card._id} xs={12} sm={6} md={4}>
                    <TripCard {...card} />
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
      </main>
    </React.Fragment>
  );
};
export default withRouter(SpiritualHome);
