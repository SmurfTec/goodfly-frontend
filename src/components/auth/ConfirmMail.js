import React, { useEffect, useState } from 'react';

import useStyles from './Styles';
import img1 from 'Assets/img/authbg.png';
import { Box } from '@material-ui/system';
import { Typography } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';

import axios from 'axios';
import { API_BASE_URL } from 'Utils/constants';
import Page from 'components/common/Page';

const ConfirmMail = ({ match, history }) => {
  const classes = useStyles();
  const { token } = match.params;

  const [authenticating, setAuthenticating] = useState(true);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await axios.get(`${API_BASE_URL}/auth/ConfirmMail/${token}`);
      } catch (err) {
        // console.log(`err`, err);
        setSuccess(false);
      } finally {
        setAuthenticating(false);

        setTimeout(() => {
          history.push('/auth/login');
        }, 2000);
      }
    })();
  }, [token]);

  return (
    <Page title='GoodFly |  Confirm Email'>
      <div className={classes.Wrapper}>
        <img src={img1} alt='plane img' className={classes.backgroundImg} />

        <Box className={classes.Main}>
          <Box className={classes.Header}>
            <Typography variant='h4' color='primary' align='center'>
              GOODFLY
            </Typography>
          </Box>
          <Box className={classes.Form}>
            {authenticating && (
              <Typography
                variant='body'
                color='textSecondary'
                style={{ marginBottom: '2rem' }}
                component='p'
              >
                Authenticating ConfirmMail Token
              </Typography>
            )}

            {authenticating ? (
              <div className='loader'></div>
            ) : (
              <Typography
                variant='h6'
                component='p'
                color={`${success ? 'success' : 'error'}`}
              >
                {success
                  ? 'Email Verified Successfully !'
                  : 'Email Verification Token Invalid or Expired !'}
              </Typography>
            )}
            <Box sx={{ my: 2 }}></Box>
            <Link to='/auth/signup'>
              <Typography variant='p' color='textSecondary'>
                Goto Login
              </Typography>
            </Link>
          </Box>
        </Box>
      </div>
    </Page>
  );
};

export default withRouter(ConfirmMail);
