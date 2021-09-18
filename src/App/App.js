import React, { useContext } from 'react';

import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'Contexts/AuthContext';

import Home from 'components/Home/index';
import Logout from 'Pages/Logout';
import Header from 'components/common/Header';
import Footer from 'Pages/Footer';

import img from 'Assets/img/loader2.gif';

import ThemeConfig from '../theme';
import TourRouter from 'Routers/TourRouter';

const App = () => {
  const { token, user } = useContext(AuthContext);

  return (
    <div className='App'>
      <ThemeConfig>
        {' '}
        {token ? (
          user ? (
            <>
              <Route exact path='/' component={Home} />
              <Route exact path='/logout' component={Logout} />
              <Redirect to='/' />
            </>
          ) : (
            <img src={img} alt='loader' />
          )
        ) : (
          <>
            {/* Only For Test purposes*/}
            <Route component={Header} />

            <Switch>
              {/* <Route
              exact
              path='/account'
              component={RegistrationMain}
            />
            <Route exact path='/forgot' component={Forgot} />
            <Route
              exact
              path='/reset/:resetToken'
              component={ResetPass}
            />
            <Route
              exact
              path='/confirmMail/:token'
              component={ConfirmMail}
            /> */}

              {/* Only for Testing ,  */}
              <Route exact path='/' component={Home} />
              <Route path='/tours' component={TourRouter} />

              <Redirect to='/' />
            </Switch>
            <Route component={Footer} />
          </>
        )}
      </ThemeConfig>{' '}
    </div>
  );
};

export default App;
