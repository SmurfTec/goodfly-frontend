import React, { useContext, useState } from 'react';

import useStyles from './Styles';
import img1 from 'Assets/img/authbg.png';
import { Box } from '@material-ui/system';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { API_BASE_URL } from 'Utils/constants';

const Login = () => {
  const classes = useStyles();

  const initialState = {
    email: '',
  };

  const [state, setState] = useState(initialState);

  const handleTextChange = (e) => {
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/forgotPassword`,
        {
          email: state.email,
        }
      );
      console.log(`res`, res);
      toast.success(
        `Reset Password Link Send to your email ${state.email}`
      );
      setState(initialState);
    } catch (err) {
      console.log(
        `err.response.data.message`,
        err.response.data.message
      );
      toast.error(
        err.response.data.message || 'Something went wrong'
      );
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
          <Typography variant='h5' color='textSecondary' gutterBottom>
            Forgot Password
          </Typography>

          <input
            className={classes.textInput}
            type='email'
            placeholder='Email'
            value={state.email}
            onChange={handleTextChange}
            name='email'
            id='email'
          />

          <Button
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
            style={{ marginTop: 20, marginBottom: '1rem' }}
          >
            Reset Password
          </Button>
          <Link to='/auth/login'>
            <Typography
              variant='p'
              color='textSecondary'
              gutterBottom
            >
              Goto Login
            </Typography>
          </Link>
          <Box sx={{ my: 2 }}></Box>
          <Link to='/signup'>
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
