import React from 'react';

// --------- MUI ----------- //
import { Container, Grid } from '@material-ui/core';
// ------------------------ //

import TripCard from './TripCard';

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
    ratings: Math.random() * 5,
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
    ratings: Math.random() * 5,
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
    ratings: Math.random() * 5,
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
    ratings: Math.random() * 5,
  },
];

const FavouritiesTab = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card._id} xs={12} sm={6} md={4}>
            <TripCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavouritiesTab;
