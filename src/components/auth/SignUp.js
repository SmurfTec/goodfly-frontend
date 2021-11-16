import React, { useContext, useState } from 'react';

import useStyles from './Styles';
import img1 from 'Assets/img/authbg.png';
import { Box } from '@material-ui/system';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { API_BASE_URL } from 'Utils/constants';
import Page from 'components/common/Page';

const SignUp = () => {
  const classes = useStyles();

  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const [state, setState] = useState(initialState);

  const handleTextChange = (e) => {
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, {
        ...state,
        role: 'visitor',
      });
      // console.log(`res`, res);
      toast.success('SignUp Success');
      toast.success(`Activation Send to your email ${state.email}`);
      // setState(initialState)
    } catch (err) {
      // console.log(
      //   `err.response.data.message`,
      //   err.response.data.message
      // );
      toast.error(err.response.data.message || 'Something went wrong');
    }
  };

  const handleToggleChange = (e) => {
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  return (
    <Page title='GoodFly |  SignUp'>
      <div className={classes.Wrapper}>
        <img src={img1} alt='plane img' className={classes.backgroundImg} />

        <Box className={classes.Main}>
          <Box className={classes.Header}>
            <Typography variant='h4' color='primary' align='center'>
              GOODFLY
            </Typography>
          </Box>
          <form className={classes.Form} onSubmit={handleSubmit}>
            <Typography variant='h5' color='textSecondary' gutterBottom>
              SignUp
            </Typography>
            <input
              className={classes.textInput}
              type='text'
              placeholder='First Name'
              value={state.firstName}
              onChange={handleTextChange}
              name='firstName'
              id='firstName'
            />
            <input
              className={classes.textInput}
              type='text'
              placeholder='Last Name'
              value={state.lastName}
              onChange={handleTextChange}
              name='lastName'
              id='lastName'
            />

            <input
              className={classes.textInput}
              type='email'
              placeholder='Email'
              value={state.email}
              onChange={handleTextChange}
              name='email'
              id='email'
            />

            <input
              className={classes.textInput}
              type='password'
              placeholder='Password'
              value={state.password}
              name='password'
              id='password'
              onChange={handleTextChange}
            />

            <input
              className={classes.textInput}
              type='password'
              placeholder='Password Confirm'
              value={state.passwordConfirm}
              name='passwordConfirm'
              id='passwordConfirm'
              onChange={handleTextChange}
            />

            <Button
              fullWidth
              type='submit'
              variant='contained'
              color='primary'
              style={{ marginTop: 20, marginBottom: '1rem' }}
            >
              Sign Up
            </Button>

            <Box sx={{ my: 2 }}></Box>
            <Link to='/auth/login'>
              <Typography variant='p' color='textSecondary'>
                Already Have an Account ? Login
              </Typography>
            </Link>
          </form>
        </Box>
      </div>
    </Page>
  );
};

export default SignUp;
