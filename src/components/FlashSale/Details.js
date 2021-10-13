import React, { useState, useEffect, useContext } from 'react';

import { Carousel } from 'react-responsive-carousel';
import { withRouter } from 'react-router-dom';

import { handleCatch, makeReq } from 'utils/constants';
import useStyles from 'Styles/Tours/Ethical';

// MUI
import {
  Grid,
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EuroIcon from '@material-ui/icons/Euro';
// --- //

// Assets
import img1 from 'Assets/img/ethical.png';
import img2 from 'Assets/img/desert.jpg';
import img3 from 'Assets/img/malaysia.jpg';
import img4 from 'Assets/img/maldives.jpg';

import stageImg1 from 'Assets/img/stage1.png';
import stageImg2 from 'Assets/img/stage12.png';
import stageImg3 from 'Assets/img/stage2.png';
import stageImg4 from 'Assets/img/stage23.png';
import StagesTab from '../EthicalTours/StagesTab';

import userImg from 'Assets/img/user1.png';

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

const stages = [
  {
    _id: '12312',
    date: '05/04/2020 - Jour #01 : ',
    locatation: 'Départ Aéroport Paris CDG',
    description: `Ut mi turpis, sagittis quis eleifend non, faucibus eget velit. Proin ullamcorper 
      pulvinar velit, vitae egestas mauris mattis in. Nam dapibus facilisis nisi, non mollis
      magna. Pellentesque at tincidunt tortor. Quisque imperdiet condimentum. 
      `,
    accommodations: [
      {
        _id: '12312312',
        location:
          'Etape : Aéroport internationnal Paris Charles de Gaulle',
        description:
          'Aliquam vel purus molestie, bibendum quam ac, tempor tortor.',
      },
      {
        _id: '12312',
        location: 'Repas : Demi-pension',
        description:
          'Urna quis sodales luctus, leo diam porttitor ante, sit amet venenatis sapien nisi in lacus.',
      },
    ],
    images: [stageImg1],
  },
  {
    _id: '12122',
    date: '05/04/2020 - Jour #01 : ',
    locatation: 'Départ Aéroport Paris CDG',
    description: `Ut mi turpis, sagittis quis eleifend non, faucibus eget velit. Proin ullamcorper 
      pulvinar velit, vitae egestas mauris mattis in. Nam dapibus facilisis nisi, non mollis
      magna. Pellentesque at tincidunt tortor. Quisque imperdiet condimentum. 
      `,
    accommodations: [
      {
        _id: '12312312',
        location:
          'Etape : Aéroport internationnal Paris Charles de Gaulle',
        description:
          'Aliquam vel purus molestie, bibendum quam ac, tempor tortor.',
      },
      {
        _id: '12312',
        location: 'Repas : Demi-pension',
        description:
          'Urna quis sodales luctus, leo diam porttitor ante, sit amet venenatis sapien nisi in lacus.',
      },
    ],
    images: [stageImg1, stageImg2, stageImg3, stageImg3, stageImg3],
  },
  {
    _id: '121dasdad2',
    date: '05/04/2020 - Jour #01 : ',
    locatation: 'Départ Aéroport Paris CDG',
    description: `Ut mi turpis, sagittis quis eleifend non, faucibus eget velit. Proin ullamcorper 
      pulvinar velit, vitae egestas mauris mattis in. Nam dapibus facilisis nisi, non mollis
      magna. Pellentesque at tincidunt tortor. Quisque imperdiet condimentum. 
      `,
    accommodations: [
      {
        _id: '12312312',
        location:
          'Etape : Aéroport internationnal Paris Charles de Gaulle',
        description:
          'Aliquam vel purus molestie, bibendum quam ac, tempor tortor.',
      },
      {
        _id: '12312',
        location: 'Repas : Demi-pension',
        description:
          'Urna quis sodales luctus, leo diam porttitor ante, sit amet venenatis sapien nisi in lacus.',
      },
    ],
    images: [
      stageImg3,
      stageImg4,
      // stageImg3,
      // stageImg4,
      // stageImg3,
      // stageImg4,
    ],
  },
];

const reviews = [
  {
    _id: '123',
    user: {
      img: userImg,
      name: 'NiyahDesign',
    },
    date: '1 novembre 2021',
    review: `Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit. Aliquam quis tortor 
    fermentum, fringilla dolor vel, sollicitudin 
    augue. Ut interdum, nisi in bibendum 
    faucibus, purus nibh scelerisque turpis`,
    rating: 4,
  },
  {
    _id: '12asdv3',
    img: userImg,
    user: {
      name: 'NiyahDesign',
    },
    date: '1 novembre 2021',
    review: `Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit. Aliquam quis tortor 
    fermentum, fringilla dolor vel, sollicitudin 
    augue. Ut interdum, nisi in bibendum 
    faucibus, purus nibh scelerisque turpis`,
    rating: 4,
  },
  {
    _id: '11',
    img: userImg,
    user: {
      name: 'NiyahDesign',
    },
    date: '1 novembre 2021',
    review: `Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit. Aliquam quis tortor 
    fermentum, fringilla dolor vel, sollicitudin 
    augue. Ut interdum, nisi in bibendum 
    faucibus, purus nibh scelerisque turpis`,
    rating: 4,
  },
];

const TourDetails = ({ match, history }) => {
  const classes = useStyles();
  const { id } = match.params;

  const [tour, setTour] = useState();
  const [ratingValue, setRatingValue] = useState(2);
  const [tabValue, setTabValue] = React.useState(0);

  const [reviewValue, setReviewValue] = useState('');

  const handleReviewChange = (e) => {
    setReviewValue(e.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const resData = await makeReq(`/trips/${id}`);
        // console.log(`resData`, resData);
        setTour(resData.trip);
      } catch (err) {
        handleCatch(err);
        setTimeout(() => {
          history.push('/tours/flash-sales');
        }, 1500);
      }
    })();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <div>
      <Carousel
        showThumbs={false}
        animationHandler='fade'
        swipeable={false}
        className={classes.Carousel}
      >
        <div>
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img3} />
        </div>
        <div>
          <img src={img4} />
        </div>
      </Carousel>
      {tour ? (
        <Box>
          <Box className={classes.Grid1}>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={7}
                className={classes.TourDetails}
              >
                <Box padding={3}>
                  <Typography
                    variant='h3'
                    color='textSecondary'
                    align='left'
                  >
                    {tour.country.toUpperCase()}
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
                  <Box
                    className={classes.TourDescription}
                    marginTop={1}
                  >
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
                      backgroundColor: '#46b9f6',
                      marginTop: '1rem',
                      paddingInline: 20,
                      width: 300,
                    }}
                    // onClick={handleReserve}
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
                    endIcon={<FavoriteIcon />}
                  >
                    {tour.price}
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
                  >
                    1233
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={0} sm={1} md={1}></Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                className={classes.RightGrid}
              >
                <Box padding={1} textAlign='center'>
                  <Typography variant='h5'>
                    YOUR GOODFLY ONLINE ADVISOR
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='p'>
                    Call a member of our agency directly at
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='h5'>01 34 74 19 39</Typography>
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
                    tabValue === 0
                      ? classes.ActiveTab
                      : classes.InActiveTab
                  }
                />
                <Tab
                  className={
                    tabValue === 1
                      ? classes.ActiveTab
                      : classes.InActiveTab
                  }
                  label='Formalities'
                />
              </Tabs>
              <TabPanel value={tabValue} index={0} dir='x'>
                <StagesTab stages={stages ? stages : []} />
              </TabPanel>
              <TabPanel value={tabValue} index={1} dir='x-reverse'>
                Item Two
              </TabPanel>
            </Box>
          </Box>

          <Box className={classes.Reviews}>
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
                {/* {tour?.reviews?.map( */}
                {reviews?.map((review, idx) => (
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
                        <img src={review.user.img} alt='user image' />
                        <Typography variant='h5'>
                          {review.user.name}
                        </Typography>
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
                          {review.date}
                          {/* {new Date(review.date).toDateString()} */}
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
                  At w3schools.com you will learn how to make a
                  website. They offer free tutorials in all web
                  development technologies.
                </textarea>

                <Button
                  variant='contained'
                  color='primary'
                  // onClick={handleReview}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <div className='loader'></div>
      )}
    </div>
  );
};

export default withRouter(TourDetails);
