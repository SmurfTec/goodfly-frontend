import React, { useContext, useEffect, useState } from 'react';

import useStyles from 'Styles/Home/HomeStyles';
// import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  Grid,
  Container,
  Button,
  Typography,
  Box,
  Paper,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import FeaturedCard from './FeaturedCard';
import { makeReq, handleCatch } from 'Utils/constants';
import FlashPromos from './FlashPromos';
import Tabs from './Tabs';
import ArrowIcon from '@material-ui/icons/ArrowForwardIos';
import VoyageCard from './VoyageCard';
import MalaysiaImg from 'Assets/img/malaysiaVoyage.jpg';
import AlAqsaMosqueImg from 'Assets/img/alaqsamosque.jpg';
import TailorMadeTripImg from 'Assets/img/tailormadeTrips.jpg';
import TravelMapImg from 'Assets/img/travelmap.png';
import useGlobalClasses from 'Hooks/useGlobalClasses';
import Page from 'components/common/Page';
import Skeleton from 'react-loading-skeleton';
import { ToursContext } from 'Contexts/ToursContext';
import { Link } from 'react-router-dom';
import CarouselLayout from 'components/common/Carousel/CarouselLayout';
import Card from 'components/common/Carousel/CaourselCard';
import GoogleMapReact from 'google-map-react';

const Index = () => {
  const { tours } = useContext(ToursContext);
  const classes = useStyles();
  const globalClasses = useGlobalClasses();

  const [offers, setOffers] = useState();
  const [tourCards, setTourCards] = useState();

  const [flashSales, setFlashSales] = useState();

  const [email, setEmail] = useState('');

  const goodflyLocation = {
    center: {
      lat: 33.68,
      lng: 73,
    },
    zoom: 11,
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // * All Trip Cards
  useEffect(() => {
    setFlashSales(tours?.filter((el) => el.sale)?.slice(0, 5));

    setOffers(
      tours
        ?.filter(
          (el) => el.category === 'ethical' || el.category === 'excursions'
        )
        ?.slice(0, 6)
    );

    setTourCards(
      tours
        ?.filter(
          (el) => el.category === 'ethical' || el.category === 'excursions'
        )
        ?.slice(0, 3)
    );
  }, [tours]);

  const handleSubscribe = async () => {
    try {
      await makeReq(`/trips/subscribe`, { body: { email } }, 'POST');
      setEmail('');

      toast.success('Subscribed Successfully');
    } catch (err) {
      handleCatch(err);
    }
  };
  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  return (
    <Page title='Goodfly | Home'>
      <Container
        sx={{ my: 2 }}
        // className={classes.root}
        className={globalClasses.MainContainer}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={classes.LeftGridItem}>
            <Grid container spacing={2} className={classes.TripCardsContainer}>
              <Grid item xs={12} sm={12} className={classes.TripCards}>
                {tourCards ? (
                  <FeaturedCard
                    mainHeading={tourCards[0].title}
                    image={tourCards[0].image}
                    id={tourCards[0]._id}
                  />
                ) : (
                  <Skeleton height={244} />
                )}
              </Grid>
              <Grid item xs={12} sm={6} className={classes.TripCards}>
                {tourCards ? (
                  <FeaturedCard
                    mainHeading={tourCards[1].title}
                    image={tourCards[1].image}
                    id={tourCards[1]._id}
                  />
                ) : (
                  <Skeleton height={244} />
                )}
              </Grid>
              <Grid item xs={12} sm={6} className={classes.TripCards}>
                {tourCards ? (
                  <FeaturedCard
                    mainHeading={tourCards[2].title}
                    image={tourCards[2].image}
                    id={tourCards[2]._id}
                  />
                ) : (
                  <Skeleton height={244} />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.RightGridItem}>
            <Tabs />
          </Grid>
          <Grid item sm={12}>
            <Typography
              variant='subtitle1'
              sx={{ my: 2, fontStyle: 'italic' }}
              align='center'
            >
              Take advantage of the best offers on flights, boats, trains,
              vehicle rentals and accommodation by signing up to the{' '}
              <a href='/'>newsletters GOODFLY !</a>
            </Typography>
          </Grid>
        </Grid>

        <Typography
          variant='h3'
          sx={{ mt: 9, mb: 4, fontStyle: 'italic' }}
          align='center'
          color='text.secondary'
        >
          Explore our latest organized trips
        </Typography>
        {offers && offers.length > 0 && (
          <CarouselLayout>
            {offers?.map((offer) => (
              <div key={offer.id} className={classes.carouselContainer}>
                <Card {...offer} />
              </div>
            ))}
          </CarouselLayout>
        )}
      </Container>
      <section className={`${classes.promoBigImg} ${classes.travelPromo}`}>
        <div className={classes.promoContent}>
          <Typography variant='h2'>Travel made to measure !</Typography>
          <div className={classes.travelPromoDesc}>
            <Typography variant='subtitle1'>
              The heart of our know-how is to be at your disposal to imagine and
              design the trip of your dreams according to your desires and
              principles.
              <br />
              <br />
              Because understanding is above all knowing and will accompany you
              throughout your journey. listen, a dedicated advisor will follow
              your request
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant='outlined'
                color='primary'
                sx={{ mt: 2, fontStyle: 'italic' }}
                component={Link}
                to='/tours/create'
              >
                Ask for a quote
              </Button>
            </Box>
          </div>
        </div>
      </section>

      <Container sx={{ my: 12 }}>
        <Grid container spacing={2} sx={{ mt: 10 }}>
          <Grid item xs={12} sm={5} sx={{ position: 'relative' }}>
            <FlashPromos tours={flashSales} />
          </Grid>
          <Grid item xs={12} sm={7}>
            <>
              <Typography
                variant='h3'
                sx={{
                  fontStyle: 'italic',
                  mb: 3,
                }}
                align='center'
                color='text.secondary'
              >
                Now is the time to book!
              </Typography>
              <Paper
                className={`${classes.promoBigImg} ${classes.hajjOmraPromo}`}
              >
                <div className={classes.hajjOmraPromoDesc}>
                  <Typography variant='h3' align='center' sx={{ mb: 2 }}>
                    Hajj 2021
                  </Typography>
                  <Typography variant='subtitle1'>
                    Discover all of our offers for the 2021 pilgrimage.
                    <br />
                    The GOODFLY team offers you several scholarships. formulas
                    that will suit all Pilgrims are looked after by a staff that
                    meets your expectations.
                    <br />
                    Explanations and clarifications of each religious rites.
                    Visits of scholars and Departures possible from all over
                    France.
                  </Typography>
                  <Box
                    sx={{
                      textAlign: 'center',
                      mt: 1,
                    }}
                  >
                    <Button
                      variant='outlined'
                      startIcon={<ArrowIcon size='small' />}
                      sx={{
                        backgroundColor: '#000',
                        color: '#FFF',
                        mt: 2,
                        fontStyle: 'italic',
                        boxShadow: 'rgba(255, 255, 255, 1) 0px 0px 8px',
                        border: 'none',
                      }}
                      component={Link}
                      to={`/tours/spiritual?type=hajj`}
                    >
                      see the offers
                    </Button>
                  </Box>
                </div>
              </Paper>
            </>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ mt: 6 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant='h1'
            sx={{ fontFamily: 'Book Antiqua', color: '#FB4B49' }}
            color='text.secondary'
          >
            3
          </Typography>
          <pre> </pre>
          <Typography
            variant='h3'
            sx={{ mb: 1, fontStyle: 'italic' }}
            color='text.secondary'
          >
            types of trips to discover with GOODFLY!
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={4}>
            <VoyageCard image={MalaysiaImg} title='Organized trips' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <VoyageCard image={AlAqsaMosqueImg} title='Ethical travels' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <VoyageCard image={TailorMadeTripImg} title='Tailor-made trips' />
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ mt: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box className={classes.newsLetterSubs}>
              <Typography variant='h6'>
                Receive the best offers <span>via the newsletter GOODFLY</span>
              </Typography>
              <Grid container sx={{ mt: 1, justifyContent: 'center' }}>
                <Grid item xs={8} sm={7}>
                  <input
                    className={classes.textInput}
                    type='text'
                    placeholder='Enter your e-mail address here'
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Grid>
                <Grid item xs sm={3}>
                  <Button
                    variant='contained'
                    fullWidth
                    onClick={handleSubscribe}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className={classes.addressBox}>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant='h6' color='text.primary'>
                    Locate us
                  </Typography>
                  <Typography
                    variant='subtitle2'
                    sx={{ mt: 1 }}
                    color='text.primary'
                  >
                    GOODFLY Les Mureaux
                  </Typography>
                  <Typography variant='body2' color='text.primary'>
                    60 Maurice Bellonte Street <br /> 78130 LES MUREAUX <br />{' '}
                    contact@goodfly.fr <br />
                    01 00 00 00 00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 200,
                    height: 180,
                  }}
                >
                  <GoogleMapReact
                    // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                    defaultCenter={goodflyLocation.center}
                    defaultZoom={goodflyLocation.zoom}
                  >
                    <AnyReactComponent lat={33.68} lng={73} text='My Marker' />
                  </GoogleMapReact>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* 
      <section className={classes.partnersSection}>
        <Typography variant='h4' align='center'>
          Our partners
        </Typography>

        <Box
          sx={{
            mt: 2,
            height: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '& img': {
              marginInline: 10,
            },
          }}
        >
          <img with='50px' height='50px' src={Partner1} alt='img' />
          <img with='50px' height='50px' src={Partner1} alt='img' />
          <img with='50px' height='50px' src={Partner1} alt='img' />
        </Box>
      </section> */}
    </Page>
  );
};

export default Index;
