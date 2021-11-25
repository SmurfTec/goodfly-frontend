import React from 'react';

// --------- MUI ----------- //
import { Container, Grid } from '@material-ui/core';
// ------------------------ //

import TripCard from './FavouritiesTripCard';

const FavouritiesTab = ({ trips }) => {
  return (
    <Container>
      <Grid container spacing={4}>
        {trips?.map((card) => (
          <Grid item key={card._id} xs={12} sm={6} md={4}>
            <TripCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavouritiesTab;
