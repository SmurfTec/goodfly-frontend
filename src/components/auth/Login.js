import React, { useContext, useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import useStyles from './Styles';
import img1 from 'Assets/img/authbg.png';
import { Box } from '@material-ui/system';
import { Button, Typography } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { API_BASE_URL, handleCatch } from 'Utils/constants';
import { AuthContext } from 'Contexts/AuthContext';
import Page from 'components/common/Page';
import { Google } from '@mui/icons-material';
import { Facebook } from '@material-ui/icons';

const Login = ({ location, history }) => {
  const classes = useStyles();
  const { signInUser, user } = useContext(AuthContext);

  const initialState = {
    email: '',
    password: '',
    remember: false,
  };

  let redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    // console.log(`redirect`, redirect);

    if (user) {
      history.push(redirect);
    }
  }, [user, history, redirect]);

  const [state, setState] = useState(initialState);

  const handleTextChange = (e) => {
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login/visitor`, {
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

  const responseFacebook = async (response) => {
    console.log(response);

    if (response.error) return;

    const { name, email, picture } = response;

    console.log(`email`, email);

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/socialLogin`, {
        name,
        email,
        socialType: 'facebook',
      });

      signInUser(res.data.token, res.data.user);
    } catch (err) {
      handleCatch(err);
    }
  };
  const responseGoogle = async (response) => {
    console.log(response);

    if (response.error) return;

    const token = response.tokenObj.access_token;
    const { name, email, imageUrl } = response.profileObj;

    console.log(`email`, email);

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/socialLogin`, {
        name,
        email,
        socialType: 'google',
        photo: imageUrl,
      });

      signInUser(res.data.token, res.data.user);
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <Page title='GoodFly |  Login'>
      <div className={classes.Wrapper}>
        <img src={img1} alt='plane img' className={classes.backgroundImg} />

        <Box className={classes.Main}>
          <Box className={classes.Header}>
            <Typography variant='h4' color='primary' align='center'>
              GOODFLY
            </Typography>
          </Box>
          <Box
            fontStyle={{
              display: 'flex',
              gap: 20,
              marginTop: '2rem',
            }}
          >
            <Button
              variant='contained'
              color='primary'
              // onClick={renderProps.onClick}
              // disabled={renderProps.disabled}
              startIcon={<Facebook />}
            >
              Facebook
              <FacebookLogin
                // appId={process.env.REACT_APP_FACEBOOKID}
                appId={'933403190884273'}
                autoLoad={false}
                fields='name,email,picture'
                // onClick={componentClicked}
                callback={responseFacebook}
                icon={<Facebook />}
                size='small'
                cssClass='facebookBtn'
                textButton='Facebook'
              />
            </Button>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLECLIENTID}
              buttonText='Google'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              icon={false}
              render={(renderProps) => (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Google />}
                >
                  Google
                </Button>
              )}
            />
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
              <Typography variant='p' color='textSecondary' gutterBottom>
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
    </Page>
  );
};

export default withRouter(Login);
