import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TripCard from './TripCard';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { styles } from 'Styles/FlashSale/FlashSaleStyles';
import TuneIcon from '@material-ui/icons/Tune';
import Advisor from './Adivsor';
import { useTheme } from '@material-ui/styles';
import { ToursContext } from 'Contexts/ToursContext';

const options = ['Price', 'Date', 'Duration', 'Best Score'];

const EthicalHome = ({ location }) => {
  const { tours } = useContext(ToursContext);

  const [ethicalTours, setEthicalTours] = useState();

  const theme = useTheme();
  const styleProps = {
    location,
    theme,
  };

  useEffect(() => {
    if (!tours || !tours.length === 0) {
      setEthicalTours([]);
      return;
    }

    setEthicalTours(tours.filter((el) => el.category === 'ethical'));
  }, [tours]);

  const classes = styles(styleProps);

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
    //   const { filter } = e.currentTarget.dataset;
    //   console.log(filter);

    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main className={classes.root}>
        {/* Hero unit */}
        <Container className={classes.cardGrid} maxWidth='lg'>
          <div className={classes.heroContent}>
            <Container className={classes.mainFeaturedPost}>
              <section className={classes.title}>
                <Typography variant='h3'>
                  Ethical Travel
                  <FlashOnIcon sx={{ marginLeft: 2 }} />
                </Typography>
              </section>
              <Advisor />
            </Container>

            <section className={classes.filter}>
              <Button
                variant='outlined'
                startIcon={<TuneIcon />}
                onClick={filterMenuOpen}
              >
                Select a filter
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
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </section>
          </div>
          {/* End hero unit */}
          <Typography variant='h5' color='textSecondary' align='left'>
            Do you have a few days ahead of you? Découvrez les ventes
          </Typography>
          <Typography
            variant='h5'
            color='textSecondary'
            align='left'
            style={{
              marginBottom: '2rem',
            }}
          >
            Flash GOODFLY : les plans dernière minute à prix cassés.
          </Typography>
          {/* Upper GridView */}
          <Grid container spacing={4}>
            {ethicalTours ? (
              ethicalTours.length > 0 ? (
                ethicalTours.map((tour) => (
                  <Grid item key={tour._id} xs={12} sm={6} md={4}>
                    <TripCard {...tour} />
                  </Grid>
                ))
              ) : (
                <Typography variant='h4'>No Tours Yet !</Typography>
              )
            ) : (
              <div className='loader'></div>
            )}
          </Grid>

          {/* Space Container */}
          <div className={classes.spaceSection}>
            <Typography variant='h5'>PUB SPACE</Typography>
          </div>
        </Container>
      </main>
    </React.Fragment>
  );
};
export default withRouter(EthicalHome);
