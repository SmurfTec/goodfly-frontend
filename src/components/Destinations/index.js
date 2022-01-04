import React from 'react';
import { Typography, Container, Grid } from '@material-ui/core';
import Banner from 'components/common/tours/Banner';
import DestCard from './DestCard';
import img from 'Assets/img/destinations1.jpg';

import africa from 'Assets/img/africa.jpg';
import asia from 'Assets/img/asia.jpg';
import europe from 'Assets/img/europe.jpg';
import oceania from 'Assets/img/oceania.jpg';
import polarIslands from 'Assets/img/polarIslands.jpg';
import america from 'Assets/img/america.jpg';
import goodflyDestPromo from 'Assets/img/goodflyDestinations.png';
import useGlobalClasses from 'Hooks/useGlobalClasses';
import Page from 'components/common/Page';
import { useHistory } from 'react-router-dom';

const Destinations = () => {
  //    const classes = styles();
  const history = useHistory();
  const globalClasses = useGlobalClasses();

  return (
    <Page title='GoodFly |  Destinations'>
      <Container sx={{ mb: 20 }} className={globalClasses.MainContainer}>
        <Banner imageUrl={img} bannerTitle='Destinations' align='center' />
        <Typography variant='h5' color='text.secondary' sx={{ mt: 4 }}>
          Because there is no one way to travel: there are as many ways to
          experience a trip as there are travelers.
        </Typography>
        <Typography variant='h4' color='text.secondary' sx={{ mt: 2 }}>
          Discover here all the destinations classified by continent and by
          country.
        </Typography>
        <Grid container sx={{ mt: 15 }} spacing={3}>
          <Grid item xs={12} sm={6}>
            <DestCard title='Africa' imageUrl={africa} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DestCard title='America' imageUrl={america} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DestCard title='Asia' imageUrl={asia} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DestCard title='Europe' imageUrl={europe} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DestCard title='Oceania' imageUrl={oceania} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DestCard title='Polar Islands' imageUrl={polarIslands} />
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 13 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle1' color='text.secondary'>
              To help you see more clearly and achieve the trip of your dreams,
              we offer on this page a series of destinations. It's up to you to
              choose the one that will be closest to you and your desires of the
              moment.
            </Typography>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              sx={{ mt: 2 }}
            >
              Dream your next adventure with travelogues, stories from
              elsewhere, great encounters, ideas for destinations and you will
              only have to go from dream to reality ...
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            align='center'
            style={{ cursor: 'pointer' }}
            onClick={() => history.push('/contact-us')}
          >
            <img
              width='200px'
              height='200px'
              src={goodflyDestPromo}
              alt='GoodFly Destination Promo'
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Destinations;
