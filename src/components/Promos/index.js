import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TripCard from 'components/common/tours/TripCard';
import { styles } from 'Styles/FlashSale/FlashSaleStyles';
import TuneIcon from '@material-ui/icons/Tune';
import { useTheme } from '@material-ui/styles';
import { ToursContext } from 'Contexts/ToursContext';
import useGlobalClasses from 'Hooks/useGlobalClasses';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Paper, TextField } from '@material-ui/core';
import Banner from 'components/common/tours/Banner';
import ethicalImg from 'Assets/img/ethical-main.png';
import Page from 'components/common/Page';
import { useTranslation } from 'react-i18next';

const options = ['Price', 'Date', 'Duration', 'Best Score'];

const Promos = ({ location }) => {
  const { tours } = useContext(ToursContext);
  const globalClasses = useGlobalClasses();
  const { t } = useTranslation();

  const [flashPromos, setFlashPromos] = useState();

  const theme = useTheme();
  const styleProps = {
    location,
    theme,
  };

  useEffect(() => {
    if (!tours || !tours.length === 0) {
      setFlashPromos([]);
      return;
    }

    setFlashPromos(tours.filter((el) => el.isPromo));
  }, [tours]);

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
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  //? Filter Item selected
  const filterSelected = (e) => {
    //? Got the selected filter value, uncomment below line
    const { filter } = e.currentTarget.dataset;
    // console.log(filter);

    switch (filter.toLowerCase()) {
      case 'price': {
        setFlashPromos((st) => {
          let sortedTours = st;
          sortedTours.sort((a, b) => (a.price > b.price ? -1 : 1));
          return sortedTours;
        });
        break;
      }
      case 'duration': {
        setFlashPromos((st) => {
          let sortedTours = st;
          sortedTours.sort((a, b) => (a.duration > b.duration ? -1 : 1));
          return sortedTours;
        });
        break;
      }
      case 'date': {
        setFlashPromos((st) => {
          let sortedTours = st;
          sortedTours.sort((a, b) =>
            new Date(a.startingDate) > new Date(b.startingDate) ? -1 : 1
          );
          return sortedTours;
        });
        break;
      }
      default: {
        setFlashPromos((st) => {
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
    <Page title={`GoodFly |  ${t('Fresh Arrivals')}`}>
      <CssBaseline />

      {/* Hero unit */}
      <Container className={globalClasses.MainContainer} maxWidth='lg'>
        <Banner
          imageUrl={ethicalImg}
          bannerTitle={t('Fresh Arrivals')}
          align='left'
        />
        <section className={classes.filter}>
          <Button
            variant='outlined'
            startIcon={<TuneIcon />}
            // onMouseOver={filterMenuOpen}
            onClick={filterMenuOpen}
            sx={{ cursor: 'pointer' }}
          >
            {t('Select A Filter')}
          </Button>

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
                {t(option)}
              </MenuItem>
            ))}
          </Menu>
        </section>

        {/* End hero unit */}
        <Typography variant='h5' color='textSecondary' align='left'>
          {t('Do you have a few days ahead of you? Discover the sales')}
        </Typography>
        <Typography
          variant='h5'
          color='textSecondary'
          align='left'
          style={{
            marginBottom: '2rem',
          }}
        >
          {t('Flash GOODFLY : last minute plans at knockdown prices.')}
        </Typography>
        {/* Upper GridView */}
        <Grid container spacing={4}>
          {flashPromos ? (
            flashPromos.length > 0 ? (
              flashPromos.map((tour) => (
                <Grid item key={tour._id} xs={12} sm={6} md={4}>
                  <TripCard {...tour} />
                </Grid>
              ))
            ) : (
              <Typography variant='h4'>{t('No Tours Yet')} !</Typography>
            )
          ) : (
            <div className='loader'></div>
          )}
        </Grid>

        {/* Space Container */}
        <div className={globalClasses.spaceSection}>
          <Typography variant='h5'>PUB SPACE</Typography>
        </div>
      </Container>
    </Page>
  );
};
export default withRouter(Promos);
