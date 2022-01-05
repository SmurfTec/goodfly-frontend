import React, { useContext, useEffect } from 'react';

import './App.css';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AuthContext } from 'Contexts/AuthContext';

import Home from 'components/Home/index';
import Logout from 'Pages/Logout';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

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
import Chat from 'components/chat';
import ScrollToTop from 'Utils/scrollToTop';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { languages } from 'Utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiContainer-root': {
      // padding: 0,
      [theme.breakpoints.up('lg')]: {
        maxWidth: '87vw',
        marginInline: 'auto',
        paddingInline: 0,
      },
    },
  },
}));

const Wrapper = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

const App = () => {
  const location = useLocation();
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  useEffect(() => {
    // console.log('Setting page stuff');
    document.body.dir = currentLanguage.dir || 'ltr';
    document.title = t('app_title');
  }, [currentLanguage, t]);

  return (
    <div className='App'>
      <ThemeConfig>
        <ScrollToTop>
          <GlobalClassesProvider>
            <Wrapper>
              {!location.pathname.includes('/auth') && (
                <Route component={Header} />
              )}
              {!location.pathname.includes('auth') && <Box mt='40px' />}
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/chat' component={Chat} />
                <Route path='/tours' component={TourRouter} />
                <ProtechtedRoute exact path='/profile' component={Profile} />
                <Route exact path='/store' component={Store} />
                <Route exact path='/store/cart' component={Checkout} />
                <Route
                  exact
                  path='/store/product/:id'
                  component={StoreDetails}
                />
                <Route exact path='/blogs' component={ClientBlog} />
                <Route exact path='/blogs/:id' component={BlogDetails} />

                <Route exact path='/contact-us' component={ContactUs} />
                <Route path='/auth' component={AuthRouter} />
                <Route exact path='/logout' component={Logout} />
                <Redirect from='*' to='/' />
              </Switch>
              {!location.pathname.includes('/auth') && (
                <Route component={Footer} />
              )}
            </Wrapper>
          </GlobalClassesProvider>
        </ScrollToTop>
      </ThemeConfig>
    </div>
  );
};

export default App;
