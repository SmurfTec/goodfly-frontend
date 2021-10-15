import React, { useState } from 'react';
import { withRouter } from 'react-router';
import GoogleMapReact from 'google-map-react';

// * ---- MUI Stuff ----- * //
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Paper,
  Divider,
  Hidden,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
// * ------------------- * //

import ContactCard from './ContactCard';
import UseInput from 'Hooks/useInput';

const useStyles = makeStyles((theme) => ({
  FormBox: {
    '& input,textarea': {
      padding: '9px 20px',
      textAlign: 'left',
      border: 0,
      outline: 0,
      borderRadius: 6,
      backgroundColor: '#fff',
      fontSize: 15,
      fontWeight: 300,
      color: '#8D8D8D',
      WebkitTransition: 'all 0.3s ease',
      transition: 'all 0.3s ease',
    },
  },
}));

const images = [
  'https://imgur.com/Ytgn4PR.png',
  'https://imgur.com/IykTxJG.png',
  'https://imgur.com/CJbU0t0.png',
];
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Index = () => {
  const theme = useTheme();
  const classes = useStyles();

  const initialState = {
    subject: '',
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    message: '',
  };
  const [state, resetState, handleTxtChange] = UseInput(initialState);

  const defaultProps = {
    center: {
      lat: 33.68,
      lng: 73,
    },
    zoom: 11,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetState();
  };

  return (
    <Container sx={{ maxWidth: 1200, marginTop: '3rem' }}>
      <Grid container spacing={4}>
        <Grid item sm={12} md={8}>
          <ContactCard image={images[1]} />
        </Grid>
        <Hidden mdDown>
          <Grid item sm={0} md={4}>
            <img src={images[2]} alt={'image2'} />
          </Grid>
        </Hidden>
      </Grid>
      <Paper
        square
        elevation={0}
        sx={{
          padding: '20px 40px',
          marginTop: '3rem',
          backgroundColor: '#f2f2f2',
          borderRadius: '15px',
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box
              fullWidth
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Box
                sx={{
                  '& h5': {
                    color: theme.palette.text.secondary,
                  },
                }}
              >
                <Typography variant='h5' gutterBottom>
                  GOODFLY Les Mureaux agency
                </Typography>
                <Typography variant='h5'>
                  52 - 54 rue Maurice Bellonte
                </Typography>
                <Typography variant='h5'>
                  78130 Les Mureaux
                </Typography>
                <Typography variant='h5'>
                  contact@goodﬂy.fr
                </Typography>
                <Typography variant='h5'>01 34 74 19 39</Typography>
              </Box>
              <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
              >
                <Box>
                  <img src='https://imgur.com/lIumYeR.png' />
                  <Typography variant='h6' fontWeight='normal'>
                    Locate on the map
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                  }}
                >
                  <GoogleMapReact
                    // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                  >
                    <AnyReactComponent
                      lat={33.68}
                      lng={73}
                      text='My Marker'
                    />
                  </GoogleMapReact>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={0} sm={6}>
            <img
              src={images[0]}
              alt={'image'}
              style={{ height: 250 }}
            />
          </Grid>
        </Grid>
        <Divider />
        <Box
          mt={5}
          paddingTop={5}
          display='flex'
          justifyContent='center'
        >
          <Box className={classes.FormBox}>
            <Typography variant='h4' sx={{ marginBottom: '2rem' }}>
              Contact Form
            </Typography>
            <Typography
              variant='h6'
              sx={{ marginBottom: '2rem' }}
              fontWeight='bold'
            >
              Contact GODDFLY by email
            </Typography>
            <form onSubmit={handleSubmit}>
              <input
                required
                onChange={handleTxtChange}
                type='text'
                value={state.subject}
                name='subject'
                placeholder='What is the subject of your message'
                style={{ width: 350 }}
              />
              <br />
              <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                mt={3}
              >
                {' '}
                <input
                  required
                  onChange={handleTxtChange}
                  type='text'
                  value={state.firstName}
                  name='firstName'
                  placeholder='First name'
                  style={{ marginRight: 50 }}
                />
                <input
                  required
                  onChange={handleTxtChange}
                  type='text'
                  value={state.lastName}
                  name='lastName'
                  placeholder='Last Name'
                />
              </Box>
              <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                my={3}
              >
                <input
                  required
                  onChange={handleTxtChange}
                  type='email'
                  value={state.email}
                  name='email'
                  placeholder='Email Address'
                />
                <input
                  required
                  onChange={handleTxtChange}
                  type='tel'
                  value={state.telephone}
                  name='telephone'
                  placeholder='Telephone'
                />
              </Box>
              <textarea
                type='text'
                value={state.message}
                name='message'
                placeholder='Message'
                rows={5}
                style={{
                  resize: 'vertical',
                  width: '100%',
                }}
                onChange={handleTxtChange}
              />
              <br />
              <Button
                variant='contained'
                color='primary'
                type='submit'
              >
                Send
              </Button>
            </form>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default withRouter(Index);
