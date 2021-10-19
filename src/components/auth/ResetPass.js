import React, { useContext, useState } from 'react';

import useStyles from './Styles';
import img1 from 'Assets/img/authbg.png';
import { Box } from '@material-ui/system';
import { Button, Typography } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { API_BASE_URL } from 'Utils/constants';

const ResetPassword = ({ history, match }) => {
  const classes = useStyles();
  const { token } = match.params;

  const initialState = {
    password: '',
    passwordConfirm: '',
  };

  const [state, setState] = useState(initialState);

  const handleTextChange = (e) => {
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.password !== state.passwordConfirm) {
      toast.error('Passwords NOT Matched');
      return;
    }
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/auth/resetPassword/${token}`,
        {
          password: state.password,
          passwordConfirm: state.passwordConfirm,
        }
      );
      // console.log(`res`, res);
      toast.success('Reset Password Success !');
      setState(initialState);
      history.push('/login');
    } catch (err) {
      // console.log(
      //   `err.response.data.message`,
      //   err.response.data.message
      // );
      toast.error(
        err.response.data.message || 'Something went wrong'
      );
    } finally {
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
            Reset Password
          </Typography>

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
            update Password
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

export default withRouter(ResetPassword);
