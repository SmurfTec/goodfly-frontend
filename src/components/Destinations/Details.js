import React, { useState, useEffect, useContext } from 'react';
import Banner from 'components/common/Banner';
import img from 'Assets/img/destinations1.jpg';
import { withRouter } from 'react-router-dom';

import { Typography, Container, Grid, Box } from '@material-ui/core';
import TripCard from './TripCard';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ToursContext } from 'Contexts/ToursContext';
import { toast } from 'react-toastify';

const allowedNames = [
  'asia',
  'europe',
  'africa',
  'oceania',
  'america',
  'polar lands',
];

const Details = ({ match, history }) => {
  const { tours } = useContext(ToursContext);

  const [regionalTours, setRegionalTours] = useState();
  const { name } = match.params;

  useEffect(() => {
    if (!allowedNames.includes(name.toLowerCase())) {
      toast.error('Invalid Region');
      setTimeout(() => {
        history.push('/tours/destinations');
      }, 1500);
      return;
    }
    if (!tours || !tours.length === 0) {
      setRegionalTours([]);
      return;
    }

    setRegionalTours(
      tours.filter((el) => el.region === name.toLowerCase())
    );
  }, [name, tours]);

  const handleClickBack = () => {
    history.goBack();
  };

  return (
    <Container>
      <Banner
        imageUrl={img}
        bannerTitle='Destinations'
        align='center'
      />
      <Typography
        variant='h3'
        color='text.secondary'
        style={{
          marginBottom: '5rem',
        }}
      >
        <ChevronLeftIcon
          style={{ cursor: 'pointer' }}
          onClick={handleClickBack}
        />
        {name.toUpperCase()}
      </Typography>
      <Grid container spacing={4}>
        {regionalTours ? (
          regionalTours.length > 0 ? (
            regionalTours.map((tour) => (
              <Grid item key={tour._id} xs={12} sm={6} md={4}>
                <TripCard {...tour} />
              </Grid>
            ))
          ) : (
            <Box mt={10}>
              <Typography variant='h4'>
                No Tours for this Region !
              </Typography>
            </Box>
          )
        ) : (
          <div className='loader'></div>
        )}
      </Grid>
    </Container>
  );
};

export default withRouter(Details);
