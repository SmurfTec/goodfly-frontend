import React, { useContext, useState } from 'react';

import useStyles from './Styles';
import img1 from 'Assets/img/authbg.png';
import { Box } from '@material-ui/system';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { API_BASE_URL } from 'Utils/constants';
import { AuthContext } from 'Contexts/AuthContext';

const Login = () => {
  const classes = useStyles();
  const { signInUser } = useContext(AuthContext);

  const initialState = {
    email: '',
    password: '',
    remember: false,
  };

  const [state, setState] = useState(initialState);

  const handleTextChange = (e) => {
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: state.email,
        password: state.password,
      });
      // console.log(`res`, res);
      toast.success('Login Success');
      setState(initialState);
      signInUser(res.data.token, res.data.user);
    } catch (err) {
      let errMsg = 'Something went wrong';
      if (err?.response?.data) errMsg = err.response.data.message;
      else errMsg = err.message;
      toast.error(errMsg);
    }
  };

  const handleToggleChange = (e) => {
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  return (
    <div className={classes.Wrapper}>
      <img
        src={img1}
        alt='plane img'
        className={classes.backgroundImg}
      />

      <Box className={classes.Main}>
        <Box className={classes.Header}>
          <Typography variant='h4' color='primary' align='center'>
            GOODFLY
          </Typography>
        </Box>
        <form className={classes.Form} onSubmit={handleSubmit}>
          <Typography variant='h5' color='textSecondary'>
            Login
          </Typography>
          <label htmlFor='email' className={classes.label}>
            Email
          </label>
          <input
            className={classes.textInput}
            type='email'
            placeholder='Email'
            value={state.email}
            onChange={handleTextChange}
            name='email'
            id='email'
          />
          <label htmlFor='password' className={classes.label}>
            Password
          </label>
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
            type='checkbox'
            placeholder='remember'
            value='Remember me'
            name='remember'
            id='remember'
            onChange={handleToggleChange}
            style={{ marginRight: 10 }}
          />
          <label htmlFor='remember' className={classes.label}>
            Remember me
          </label>

          <Button
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
            style={{ marginTop: 20, marginBottom: '1rem' }}
          >
            Login
          </Button>
          <Link to='/auth/forgot-password'>
            <Typography
              variant='p'
              color='textSecondary'
              gutterBottom
            >
              forgot your password ?
            </Typography>
          </Link>
          <Box sx={{ my: 2 }}></Box>
          <Link to='/auth/signup'>
            <Typography variant='p' color='textSecondary'>
              Dont Have an Account ? SignUp
            </Typography>
          </Link>
        </form>
      </Box>
    </div>
  );
};

export default Login;
