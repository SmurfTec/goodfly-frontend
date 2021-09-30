import React from 'react';
import { Typography, Container, Grid } from '@material-ui/core';
// import { styles } from 'Styles/Home/HomeStyles';
import Banner from 'components/common/Banner';
import DestCard from './DestCard';
import img from 'Assets/img/destinations1.jpg';

import africa from 'Assets/img/africa.jpg';
import asia from 'Assets/img/asia.jpg';
import europe from 'Assets/img/europe.jpg';
import oceania from 'Assets/img/oceania.jpg';
import polarIslands from 'Assets/img/polarIslands.jpg';
import america from 'Assets/img/america.jpg';
import goodflyDestPromo from 'Assets/img/goodflyDestinations.png';

const cards = [
  {
    title: 'Dubai',
    _id: '1',
    desc: 'The Dubai that no one sees',
    service: 'The GOODFLY guide on site will welcome you ...',
    noofJourneys: '2 jours',
    price: '> $200',
    image:
      'https://images.unsplash.com/photo-1583499882110-688e720b025e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZHViYWl8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    startingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
    endingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 24),
    boardType: 'Half Board',
    country: 'Pakistan',
    continent: 'America',
  },
  {
    title: 'Dubai',
    _id: '2',

    desc: 'The Dubai that no one sees',
    service: 'The GOODFLY guide on site will welcome you ...',
    noofJourneys: '2 jours',
    price: '> $200',
    image:
      'https://images.unsplash.com/photo-1610823230542-55da5ce635aa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZHViYWl8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    startingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
    endingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 24),
    boardType: 'Half Board',
    country: 'Malaysia',
    continent: 'Asis',
  },

  {
    title: 'Dubai',
    _id: '3',

    desc: 'The Dubai that no one sees',
    service: 'The GOODFLY guide on site will welcome you ...',
    noofJourneys: '2 jours',
    price: '> $200',
    image:
      'https://images.unsplash.com/photo-1589695021834-9f2413573b28?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZHViYWl8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    startingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
    endingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 24),
    boardType: 'Half Board',
    country: 'Indonesia',
    continent: 'Africa',
  },
  {
    title: 'Dubai',
    _id: '4',
    desc: 'The Dubai that no one sees',
    service: 'The GOODFLY guide on site will welcome you ...',
    noofJourneys: '2 jours',
    price: '> $2000',
    image:
      'https://images.unsplash.com/photo-1610823230542-55da5ce635aa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZHViYWl8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    startingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
    endingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 24),
    boardType: 'Half Board',
    country: 'Turkeu',
    continent: 'Europe',
  },
];

const Destinations = () => {
  //    const classes = styles();
  return (
    <Container sx={{ mb: 20 }}>
      <Banner
        imageUrl={img}
        bannerTitle='Destinations'
        align='center'
      />
      <Typography variant='h5' color='text.secondary' sx={{ mt: 4 }}>
        Because there is no one way to travel: there are as many ways
        to experience a trip as there are travelers.
      </Typography>
      <Typography variant='h4' color='text.secondary' sx={{ mt: 2 }}>
        Discover here all the destinations classified by continent and
        by country.
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
            To help you see more clearly and achieve the trip of your
            dreams, we offer on this page a series of destinations.
            It's up to you to choose the one that will be closest to
            you and your desires of the moment.
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            sx={{ mt: 2 }}
          >
            Dream your next adventure with travelogues, stories from
            elsewhere, great encounters, ideas for destinations and
            you will only have to go from dream to reality ...
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} align='center'>
          <img
            width='200px'
            height='200px'
            src={goodflyDestPromo}
            alt='GoodFly Destination Promo'
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Destinations;
