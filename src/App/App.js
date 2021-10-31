import React, { useContext } from 'react';

import './App.css';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
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
import ContactUs from 'components/contact-us';
import StoreDetails from 'components/Store/Details';
import Checkout from 'components/Store/Checkout';

import Profile from 'components/Profile';
import { GlobalClassesProvider } from 'Contexts/GlobalClasses';
import ProtechtedRoute from 'Routers/ProtechtedRoute';

const App = () => {
  const { user } = useContext(AuthContext);

  const location = useLocation();

  return (
    <div className='App'>
      <ThemeConfig>
        <GlobalClassesProvider>
          {!location.pathname.includes('/auth') && <Route component={Header} />}
          {/* <Route component={Header} /> */}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/tours' component={TourRouter} />
            <ProtechtedRoute exact path='/profile' component={Profile} />
            <Route exact path='/store' component={Store} />
            <Route exact path='/store/cart' component={Checkout} />
            <Route exact path='/store/product/:id' component={StoreDetails} />
            <Route exact path='/blogs' component={ClientBlog} />
            <Route exact path='/blogs/:id' component={BlogDetails} />

            <Route exact path='/contact-us' component={ContactUs} />
            <Route path='/auth' component={AuthRouter} />
            <Route exact path='/logout' component={Logout} />
            <Redirect from='*' to='/' />
          </Switch>
          {!location.pathname.includes('/auth') && <Route component={Footer} />}
        </GlobalClassesProvider>
      </ThemeConfig>
    </div>
  );
};

export default App;
