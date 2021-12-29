import React, { useState } from 'react';
import { withRouter } from 'react-router';

// * ---- MUI Stuff ----- * //
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  Hidden,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
// * ------------------- * //

import ContactCard from './ContactCard';
import UseInput from 'Hooks/useInput';
import { ReactSVG } from 'react-svg';
import {
  fbSvg,
  instagramSvg,
  snapchatSvg,
  pinterestSvg,
  telegramSvg,
  twitterSvg,
  youtubeSvg,
} from 'Assets/svg';

import { makeReq, handleCatch } from 'Utils/constants';
import { toast } from 'react-toastify';

import useGlobalClasses from 'Hooks/useGlobalClasses';

const useStyles = makeStyles((theme) => ({
  FormBox: {
    width: '100%',
    padding: '1rem 3rem 1rem',
    '& input,textarea': {
      padding: '9px 20px',
      textAlign: 'left',
      border: '1px solid #ccc',
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
  newsLetterSubs: {
    height: '100%',
    padding: theme.spacing(3, 3),
    backgroundColor: '#4d4d4d',
    color: '#fff',
    borderRadius: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    '& h6': {
      '& span': {
        color: theme.palette.primary.main,
      },
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 662,
    marginInline: 'auto',
  },
  textInput: {
    width: '100%',
    padding: '9px 20px',
    textAlign: 'left',
    // border: 0,
    border: '1px solid #ccc',

    outline: 0,
    borderRadius: 6,
    backgroundColor: '#fff',
    fontSize: 15,
    fontWeight: 300,
    color: '#8D8D8D',
    WebkitTransition: 'all 0.3s ease',
    transition: 'all 0.3s ease',
  },
}));

const images = [
  'https://imgur.com/Ytgn4PR.png',
  'https://imgur.com/IykTxJG.png',
  'https://imgur.com/CJbU0t0.png',
];

const Index = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const globalClasses = useGlobalClasses();

  const initialState = {
    subject: '',
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    message: '',
  };
  const [state, resetState, handleTxtChange] = UseInput(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetState();
  };

  const handleSubscribe = async () => {
    try {
      await makeReq(`/trips/subscribe`, { body: { email } }, 'POST');
      setEmail('');

      toast.success('Subscribed Successfully');
    } catch (err) {
      handleCatch(err);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Container className={globalClasses.MainContainer}>
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
      <Box
        square
        elevation={0}
        sx={{
          padding: '20px 40px',
          marginTop: '3rem',
          backgroundColor: '#f2f2f2',
          borderRadius: '15px',
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            padding: '30px 20px',
            borderRadius: '10px',
          }}
        >
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
                  <img
                    src='https://imgur.com/lIumYeR.png'
                    style={{ margin: 'auto' }}
                  />
                  <Typography variant='h6' fontWeight='normal'>
                    Locate on the map
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 200,
                    height: 180,
                  }}
                >
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20945.283694899448!2d1.911903590271735!3d48.98850372757067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6928965bfe351%3A0x8a35de2c8d45b455!2s60%20Rue%20Maurice%20Bellonte%2C%2078130%20Les%20Mureaux%2C%20France!5e0!3m2!1sen!2s!4v1637830682120!5m2!1sen!2s'
                    width='200'
                    height='180'
                    // style={{'border:0'}}
                    allowfullscreen='true'
                    loading='lazy'
                  ></iframe>
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
          <Box className={classes.FormBox} fullWidth>
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
                style={{
                  width: '60%',
                }}
              />
              <br />
              <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                mt={3}
                style={{
                  width: '60%',
                }}
              >
                <input
                  required
                  onChange={handleTxtChange}
                  type='text'
                  value={state.firstName}
                  name='firstName'
                  placeholder='First name'
                  style={{
                    width: '40%',
                  }}
                />
                <input
                  required
                  onChange={handleTxtChange}
                  type='text'
                  value={state.lastName}
                  name='lastName'
                  placeholder='Last Name'
                  style={{
                    width: '40%',
                  }}
                />
              </Box>
              <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                my={3}
                style={{
                  width: '60%',
                }}
              >
                <input
                  required
                  onChange={handleTxtChange}
                  type='email'
                  value={state.email}
                  name='email'
                  placeholder='Email Address'
                  style={{
                    width: '40%',
                  }}
                />
                <input
                  required
                  onChange={handleTxtChange}
                  type='tel'
                  value={state.telephone}
                  name='telephone'
                  placeholder='Telephone'
                  style={{
                    width: '40%',
                  }}
                />
              </Box>
              <textarea
                type='text'
                value={state.message}
                name='message'
                placeholder='Message'
                rows={10}
                style={{
                  resize: 'vertical',
                  width: '60%',
                }}
                onChange={handleTxtChange}
              />
              <br />
              <Button
                variant='contained'
                color='primary'
                type='submit'
                style={{ width: '20%' }}
              >
                Send
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
      <Box className={classes.newsLetterSubs} my={3}>
        <Typography variant='h6'>
          Receive the best offers{' '}
          <span>via the newsletter GOODFLY</span>
        </Typography>
        <Grid container sx={{ mt: 1, justifyContent: 'center' }}>
          <Grid item xs={9} sm={7}>
            <input
              className={classes.textInput}
              type='text'
              placeholder='Enter your e-mail address here'
              value={email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={1} sm={1} />
          <Grid item xs={2} sm={3}>
            <Button
              variant='contained'
              fullWidth
              onClick={handleSubscribe}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mt={5} sx={{ marginInline: 'auto', textAlign: 'center' }}>
        <Typography variant='h4'>
          FOLLOW GOODFLY ON SOCIAL MEDIA
        </Typography>
        <Box
          mt={1}
          display='flex'
          flexDirection='row'
          alignItems='center'
          justifyContent='center'
          gap={5}
        >
          <ReactSVG src={fbSvg} />
          <ReactSVG src={instagramSvg} />
          <ReactSVG src={snapchatSvg} />
          <ReactSVG src={pinterestSvg} />
          <ReactSVG src={telegramSvg} />
          <ReactSVG src={twitterSvg} />
          <ReactSVG src={youtubeSvg} />
        </Box>
      </Box>
    </Container>
  );
};

export default withRouter(Index);
