import React, { useContext, useEffect, useState, useMemo } from 'react';
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
import Advisor from 'components/common/tours/Advisor';
import { useTheme } from '@material-ui/styles';
import { ToursContext } from 'Contexts/ToursContext';
import useGlobalClasses from 'Hooks/useGlobalClasses';
import flashImg from 'Assets/img/flash-sale.png';
import Banner from 'components/common/tours/Banner';
import Page from 'components/common/Page';
import PaginationBar from 'components/common/Pagination';
import { useTranslation } from 'react-i18next';

const options = ['Price', 'Date', 'Duration', 'Best Score'];
const TOURS_PER_PAGE = 12;

const FlashSale = ({ location }) => {
  const theme = useTheme();
  const globalClasses = useGlobalClasses();
  const { tours } = useContext(ToursContext);
  const [flashSales, setFlashSales] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (!tours || !tours.length === 0) {
      setFlashSales([]);
      return;
    }

    setFlashSales(
      tours.filter((el) => el.sale && new Date(el.saleExpires) >= new Date())
    );
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
          sortedTours.sort((a, b) => (a.duration > b.duration ? -1 : 1));
          return sortedTours;
        });
        break;
      }
      case 'date': {
        setFlashSales((st) => {
          let sortedTours = st;
          sortedTours.sort((a, b) =>
            new Date(a.startingDate) > new Date(b.startingDate) ? -1 : 1
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

  // * Pagination
  const [page, setPage] = React.useState(1);
  const DataCount = useMemo(() => {
    if (!flashSales) return;

    // *  total pages  = (total flashSales / flashSales per page )+ 1
    return Math.ceil(flashSales.length / TOURS_PER_PAGE);
  }, [flashSales]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // * ------------ *  //

  return (
    <Page title={`GoodFly |  ${t('Flash Sales')}`}>
      <CssBaseline />

      {/* Hero unit */}
      <Container className={globalClasses.MainContainer} maxWidth='lg'>
        <Banner
          imageUrl={flashImg}
          bannerTitle={t('Flash Sales')}
          align='left'
        />
        <section className={classes.filter}>
          <Button
            variant='outlined'
            startIcon={<TuneIcon />}
            onClick={filterMenuOpen}
          >
            {t('Select A Filter')}
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
          {flashSales ? (
            flashSales.length > 0 ? (
              flashSales
                ?.slice(
                  (page - 1) * TOURS_PER_PAGE,
                  (page - 1) * TOURS_PER_PAGE + TOURS_PER_PAGE
                )
                .slice(0, 6)
                .map((tour) => (
                  <Grid item key={tour._id} xs={12} sm={6} md={4}>
                    <FlashCard {...tour} />
                  </Grid>
                ))
            ) : (
              <Box mt={5}>
                <Typography variant='h4'>
                  {t('No Flash Sales Available Now')} !
                </Typography>
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
          {flashSales
            ?.slice(
              (page - 1) * TOURS_PER_PAGE,
              (page - 1) * TOURS_PER_PAGE + TOURS_PER_PAGE
            )
            ?.slice(6)
            .map((tour) => (
              <Grid item key={tour._id} xs={12} sm={6} md={4}>
                <FlashCard {...tour} />
              </Grid>
            ))}
        </Grid>

        {flashSales?.length > 0 && (
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
export default withRouter(FlashSale);
