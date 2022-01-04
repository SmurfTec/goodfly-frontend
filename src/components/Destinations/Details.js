import React, { useState, useEffect, useContext, useMemo } from 'react';
import Banner from 'components/common/tours/Banner';
import img from 'Assets/img/destinations1.jpg';
import { withRouter } from 'react-router-dom';

import { Typography, Container, Grid, Box } from '@material-ui/core';
import TripCard from 'components/common/tours/TripCard';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ToursContext } from 'Contexts/ToursContext';
import { toast } from 'react-toastify';
import PaginationBar from 'components/common/Pagination';
import useGlobalClasses from 'Hooks/useGlobalClasses';
const TOURS_PER_PAGE = 12;

const allowedNames = [
  'asia',
  'europe',
  'africa',
  'oceania',
  'america',
  'polar-lands',
];

const Details = ({ match, history }) => {
  const { tours } = useContext(ToursContext);
  const globalClasses = useGlobalClasses();

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

    setRegionalTours(tours.filter((el) => el.region === name.toLowerCase()));
  }, [name, tours]);

  const handleClickBack = () => {
    history.push('/tours/destinations');
  };

  // * Pagination
  const [page, setPage] = React.useState(1);
  const DataCount = useMemo(() => {
    if (!regionalTours) return;

    // *  total pages  = (total regionalTours / regionalTours per page )+ 1
    return Math.ceil(regionalTours.length / TOURS_PER_PAGE);
  }, [regionalTours]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // * ------------ *  //

  return (
    <Container>
      <Banner imageUrl={img} bannerTitle='Destinations' align='center' />
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
      <Grid container spacing={4} mb={2}>
        {regionalTours ? (
          regionalTours.length > 0 ? (
            regionalTours
              ?.slice(
                (page - 1) * TOURS_PER_PAGE,
                (page - 1) * TOURS_PER_PAGE + TOURS_PER_PAGE
              )
              .slice(0, 6)
              .map((tour) => (
                <Grid item key={tour._id} xs={12} sm={6} md={4}>
                  <TripCard {...tour} title={tour.title} />
                </Grid>
              ))
          ) : (
            <Box mt={10}>
              <Typography variant='h4'>No Tours for this Region !</Typography>
            </Box>
          )
        ) : (
          <div className='loader'></div>
        )}
      </Grid>
      <Grid container spacing={4}>
        {regionalTours
          ?.slice(
            (page - 1) * TOURS_PER_PAGE,
            (page - 1) * TOURS_PER_PAGE + TOURS_PER_PAGE
          )
          ?.slice(6)
          .map((tour) => (
            <Grid item key={tour._id} xs={12} sm={6} md={4}>
              <TripCard {...tour} title={tour.title} />
            </Grid>
          ))}
      </Grid>

      <div className={globalClasses.spaceSection}>
        <Typography variant='h5'>PUB SPACE</Typography>
      </div>

      {regionalTours?.length > 0 && (
        <PaginationBar
          page={page}
          count={DataCount}
          onChange={handleChangePage}
        />
      )}
    </Container>
  );
};

export default withRouter(Details);
