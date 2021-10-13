import React, { useContext } from 'react';

import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'Contexts/AuthContext';

import Home from 'components/Home/index';
import Logout from 'Pages/Logout';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

import img from 'Assets/img/loader2.gif';

import ThemeConfig from '../theme';
import TourRouter from 'Routers/TourRouter';
import AuthRouter from 'Routers/AuthRouter';
import ClientBlog from 'components/Blog';
import BlogDetails from 'components/Blog/BlogDetails';
import Store from 'components/Store';
import StoreDetails from 'components/Store/StoreDetails';

import Profile from 'components/Profile';

const App = () => {
  const { token, user } = useContext(AuthContext);

  return (
    <div className='App'>
      <ThemeConfig>
        {token ? (
          user ? (
            <>
              <Route component={Header} />
              <Switch>
                <Route path='/tours' component={TourRouter} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/' component={Home} />

                <Route exact path='/store' component={Store} />
                <Route
                  exact
                  path='/store/:id'
                  component={StoreDetails}
                />

                <Route exact path='/blogs' component={ClientBlog} />
                <Route
                  exact
                  path='/blogs/:id'
                  component={BlogDetails}
                />
                <Route exact path='/logout' component={Logout} />
                <Redirect from='*' to='/' />
              </Switch>
              <Route component={Footer} />
            </>
          ) : (
            <img
              style={{
                margin: 'auto ',
              }}
              src={img}
              alt='loader'
            />
          )
        ) : (
          <>
            <Switch>
              <Route path='/auth' component={AuthRouter} />

              <Redirect to='/auth/login' />
            </Switch>
          </>
        )}
      </ThemeConfig>
    </div>
  );
};

export default App;
