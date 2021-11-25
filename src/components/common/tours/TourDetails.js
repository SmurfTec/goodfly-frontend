import React, { useState, useEffect, useContext, useMemo } from 'react';

import { Carousel } from 'react-responsive-carousel';
import { withRouter, Link } from 'react-router-dom';

import { handleCatch, makeReq } from 'Utils/constants';
import useStyles from 'Styles/Tours/Ethical';

// MUI
import {
  Grid,
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Container,
  Skeleton,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EuroIcon from '@material-ui/icons/Euro';
import { animateScroll as scroll } from 'react-scroll';
// --- //

// Assets
// import img1 from 'Assets/img/ethical.png';
// import img2 from 'Assets/img/desert.jpg';
// import img3 from 'Assets/img/malaysia.jpg';
// import img4 from 'Assets/img/maldives.jpg';

// import stageImg1 from 'Assets/img/stage1.png';
// import stageImg2 from 'Assets/img/stage12.png';
// import stageImg3 from 'Assets/img/stage2.png';
// import stageImg4 from 'Assets/img/stage23.png';
import StagesTab from './StagesTab';

import defaultUserImg from 'Assets/img/user1.png';
import FormalitiesTab from './FormalitiesTab';
import { AuthContext } from 'Contexts/AuthContext';

import FavoriteIconFilled from '@material-ui/icons/Favorite';
import FavoriteIconOutlined from '@material-ui/icons/FavoriteBorder';
import { ToursContext } from 'Contexts/ToursContext';
import UseToggle from 'Hooks/useToggle';
// ------------------------------

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const TourDetails = ({ match, history, location }) => {
  const { favouriteTrip, unFavouriteTrip, tours, getTripById } =
    useContext(ToursContext);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isHandlingFavourite, toggleHandlingFavourite] = UseToggle(false);

  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { id } = match.params;

  const [tour, setTour] = useState();
  const [ratingValue, setRatingValue] = useState(2);
  const [tabValue, setTabValue] = React.useState(0);

  const [reviewValue, setReviewValue] = useState('');

  useEffect(() => {
    if (!!user?.favourities?.find((el) => el._id === id)) setIsFavourite(true);
    else setIsFavourite(false);
  }, [user, id]);

  const handleReviewChange = (e) => {
    setReviewValue(e.target.value);
  };
  const handleLinkClick = () => {
    scroll.scrollToTop({
      duration: 1000,
      delay: 100,
    });
  };
  useEffect(() => {
    setTour(getTripById(id));
  }, [id, tours]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleReview = () => {
    if (user) {
      //  * Handle Review
    } else {
      //  * Redirect to Login
      history.push(`/auth/login?redirect=${location.pathname}}`);
    }
  };

  const tripReservation = () =>
    user?.Purchases?.find((purchase) => purchase?.trip?._id === id);

  const isAlreadyPurchased = useMemo(() => {
    return !!tripReservation();
  }, [id, user]);

  const canUserReview = useMemo(() => {
    if (!isAlreadyPurchased) return;

    // * User's Purchase's Status must be reservation-paid
    // * And Trip's Ending Date must have been passed
    // % i.e Visitor can review if trip have been completed
    const tripPurchase = tripReservation;
    return (
      tripPurchase?.status === 'reservation-paid' &&
      new Date() > new Date(tour.endingDate)
    );
  }, [isAlreadyPurchased]);

  const handleFavorite = (e) => {
    // e.preventDefault();
    toggleHandlingFavourite();

    e.stopPropagation();

    //  * If User NOT Logged In , goto Login Page
    if (!user) history.push(`/auth/login?redirect=${location.pathname}`);
    favouriteTrip(id, toggleHandlingFavourite);
  };

  const handleUnFavorite = (e) => {
    toggleHandlingFavourite();
    e.preventDefault();
    e.stopPropagation();

    //  * If User NOT Logged In , goto Login Page
    if (!user) history.push(`/auth/login?redirect=${location.pathname}}`);
    else unFavouriteTrip(id, toggleHandlingFavourite);
  };

  return (
    <div>
      {tour ? (
        <Carousel
          showThumbs={false}
          animationHandler='fade'
          swipeable={false}
          className={classes.Carousel}
        >
          <div>
            <img src={tour?.image} />
          </div>
          {tour?.stages.map((stage, index) =>
            stage.images?.map((image, idx) => (
              <div key={idx}>
                <img src={image} />
              </div>
            ))
          )}
        </Carousel>
      ) : (
        <></>
      )}
      {tour ? (
        <Box>
          <Box className={classes.Grid1}>
            <Grid container>
              <Grid item xs={12} sm={7} className={classes.TourDetails}>
                <Box padding={3}>
                  <Typography variant='h3' color='textSecondary' align='left'>
                    {tour?.country.toUpperCase()}
                  </Typography>
                  <Box display='flex' alignItems='center'>
                    <Typography
                      variant='p'
                      fontWeight='bold'
                      color='textSecondary'
                      marginRight={2}
                    >
                      {new Date(tour.startingDate).toDateString()}
                    </Typography>
                    <Rating
                      size='small'
                      name='simple-controlled'
                      value={tour?.rating || 5}
                      onChange={(event, newValue) => {
                        setRatingValue(newValue);
                      }}
                    />
                  </Box>
                  <Box className={classes.TourDescription} marginTop={1}>
                    <Typography
                      style={{
                        borderRight: '1px solid #999999',
                        align: 'center',
                        width: '60%',
                        paddingRight: 20,
                        marginRight: 20,
                      }}
                      variant='p'
                    >
                      {tour.description}
                    </Typography>
                    <Box>
                      <Typography
                        variant='p'
                        align='left'
                        style={{ fontWeight: 600 }}
                      >
                        Included services
                      </Typography>
                      <ul
                        style={{
                          paddingLeft: 20,
                          textAlign: 'left',
                        }}
                      >
                        {tour.services?.map((service) => (
                          <li key={service}>{service}</li>
                        ))}
                      </ul>
                    </Box>
                  </Box>
                  <Button
                    variant='contained'
                    style={{
                      marginTop: '1rem',
                      paddingInline: 20,
                      width: 300,
                    }}
                    component={Link}
                    to={
                      user
                        ? `/tours/reservation/${id}`
                        : `/auth/login?redirect=/tours/reservation/${id}`
                    }
                    onClick={handleLinkClick}
                    disabled={isAlreadyPurchased}
                  >
                    Reserve
                  </Button>
                </Box>
                <Box
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                  }}
                >
                  <Button
                    variant='contained'
                    style={{
                      backgroundColor: '#d2251d',
                      marginRight: 20,
                      borderRadius: 'unset',
                      borderBottomLeftRadius: 15,
                    }}
                    disabled={isHandlingFavourite}
                    onClick={isFavourite ? handleUnFavorite : handleFavorite}
                    endIcon={
                      isFavourite ? (
                        <FavoriteIconFilled
                          style={{
                            color: '#fff',
                          }}
                        />
                      ) : (
                        <FavoriteIconOutlined
                          style={{
                            color: '#fff',
                          }}
                        />
                      )
                      // <FavoriteIcon />
                    }
                  >
                    Favourite
                  </Button>
                  <Button
                    variant='contained'
                    style={{
                      backgroundColor: '#d2251d',
                      fontSize: '1.5em',
                      borderRadius: 'unset',
                      borderBottomRightRadius: 15,
                    }}
                    endIcon={<EuroIcon />}
                    component={'div'}
                  >
                    {tour.price}
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={0} sm={1} md={1}></Grid>
              <Grid item xs={12} sm={4} md={3} className={classes.RightGrid}>
                <Box padding={1} textAlign='center'>
                  <Typography variant='h5'>
                    YOUR GOODFLY ONLINE ADVISOR
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='p' align='center' component='h5'>
                    Call a member of our agency directly at
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='h5' align='center'>
                    01 34 74 19 39
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box marginTop={5} className={classes.Stages}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor='primary'
                textColor='primary'
                centered
                variant='fullWidth'
                indicatorColor=''
                className={classes.Tabs}
              >
                <Tab
                  label='Route'
                  className={
                    tabValue === 0 ? classes.ActiveTab : classes.InActiveTab
                  }
                />
                <Tab
                  className={
                    tabValue === 1 ? classes.ActiveTab : classes.InActiveTab
                  }
                  label='Formalities'
                />
              </Tabs>
              <TabPanel value={tabValue} index={0} dir='x'>
                <StagesTab stages={tour ? tour.stages : []} />
              </TabPanel>
              <TabPanel value={tabValue} index={1} dir='x-reverse'>
                <FormalitiesTab></FormalitiesTab>
              </TabPanel>
            </Box>
          </Box>

          <Container className={classes.Reviews}>
            <Typography variant='h6' color='textPrimary'>
              Reviews {`(${tour?.reviews?.length || 0})`}
            </Typography>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  borderRight: '1px solid #ccc',
                  marginTop: '2rem',
                }}
              >
                {tour?.reviews?.map((review, idx) => (
                  // {reviews?.map((review, idx) => (
                  <Box
                    key={review._id}
                    className={classes.Review}
                    style={{
                      marginTop: idx === 0 && '2rem',
                    }}
                  >
                    <Box
                      display='flex'
                      justifyContent='space-evenly'
                      alignItems='center'
                    >
                      <Box className={classes.ReviewUser}>
                        <img
                          src={review.user.photo || defaultUserImg}
                          alt='user image'
                        />
                        <Typography variant='h5'>{review.user.name}</Typography>
                      </Box>
                      <Box className={classes.ReviewInfo}>
                        <Rating
                          // size='small'
                          name='simple-controlled'
                          value={review.rating}
                          readOnly
                        />
                        <Typography
                          variant='h5'
                          component='p'
                          fontWeight='normal'
                          color='textSecondary'
                        >
                          {new Date(review.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant='h6'
                      component='p'
                      style={{
                        marginTop: '2rem',
                      }}
                      color='textSecondary'
                    >
                      {review.review}
                    </Typography>
                  </Box>
                ))}
              </Grid>
              {canUserReview && (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{
                    marginTop: '2rem',
                    textAlign: 'left',
                    padding: 40,
                  }}
                >
                  <Typography variant='h6' fontWeight='bold'>
                    Add a Review
                  </Typography>
                  <Typography variant='h4' fontWeight='bold'>
                    Vote Now
                  </Typography>
                  <Rating
                    // size='small'
                    name='simple-controlled'
                    value={ratingValue}
                    onChange={(event, newValue) => {
                      setRatingValue(newValue);
                    }}
                  />
                  <Box marginTop={2} marginBottom={2} />
                  <Typography
                    variant='h5'
                    fontWeight='bold'
                    style={{
                      marginTop: '2rem',
                    }}
                    component='label'
                    htmlFor='review'
                  >
                    Your Opinion
                  </Typography>
                  {/* <label for='w3review'>Review of W3Schools:</label> */}
                  <textarea
                    id='review'
                    name='review'
                    rows='4'
                    cols='50'
                    value={reviewValue}
                    placeholder='Review'
                    onChange={handleReviewChange}
                    style={{
                      width: '100%',
                      padding: 20,
                      fontSize: 20,
                    }}
                  >
                    At w3schools.com you will learn how to make a website. They
                    offer free tutorials in all web development technologies.
                  </textarea>

                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleReview}
                  >
                    Submit
                  </Button>
                </Grid>
              )}
            </Grid>
          </Container>
        </Box>
      ) : (
        <div className='loading'></div>
      )}{' '}
    </div>
  );
};

export default withRouter(TourDetails);
