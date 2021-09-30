import React, { useState } from 'react';
import { withRouter } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TripCard from './TripCard';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { styles } from 'Styles/FlashSale/FlashSaleStyles';
import TuneIcon from '@material-ui/icons/Tune';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Advisor from './Adivsor';
import { useTheme } from '@material-ui/styles';
import Banner from 'components/common/Banner';
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

const options = ['Price', 'Date', 'Duration', 'Best Score'];

const EthicalHome = ({ location }) => {
  const [currentTab, setCurrentTab] = useState(1);
  const theme = useTheme();
  const styleProps = {
    location,
    theme,
  };

  const classes = styles(styleProps);
  const handleTab = (st) => {
    setCurrentTab(st);
  };

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
            {/* <Container className={classes.mainFeaturedPost}>
              <section className={classes.title}>
                <Typography variant='h3'>
                  Ethical Travel
                  <FlashOnIcon sx={{ marginLeft: 2 }} />
                </Typography>
              </section>
              <Advisor />
            </Container> */}

            <Banner
              imageUrl={
                'https://m.hziegler.com/hza-resized-images/articles/hajj/mecca-at-night_450x300.jpg'
              }
              bannerTitle={`${
                currentTab === 1 ? 'Omra' : 'Hajj'
              } Offers`}
              align='center'
            />

            <section className={classes.filter}>
              <Button
                variant='outlined'
                startIcon={<TuneIcon />}
                onClick={filterMenuOpen}
                color='inherit'
                style={{
                  marginRight: '14rem',
                }}
              >
                Select a filter
              </Button>
              <Box>
                <Button
                  variant='outlined'
                  onClick={filterMenuOpen}
                  color='inherit'
                  style={{}}
                  onClick={handleTab.bind(this, 1)}
                  style={{
                    color: currentTab === 1 ? '#000' : '#ccc',
                    borderColor: currentTab === 1 ? '#000' : '#ccc',
                    marginRight: '2rem',
                  }}
                >
                  OMRA OFFERS
                </Button>
                <Button
                  variant='outlined'
                  onClick={filterMenuOpen}
                  textSecondary
                  color='inherit'
                  onClick={handleTab.bind(this, 0)}
                  style={{
                    color: currentTab === 0 ? '#000' : '#ccc',
                    borderColor: currentTab === 0 ? '#000' : '#ccc',
                  }}
                >
                  HAJJ OFFERS
                </Button>
              </Box>
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
                    HAJJ OFFERS
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
            {cards.map((card) => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <TripCard {...card} />
              </Grid>
            ))}
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
