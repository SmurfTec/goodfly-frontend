import React, { useContext } from 'react';

import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'Contexts/AuthContext';

import Home from 'components/Home/index';
import Logout from 'Pages/Logout';
import Navbar from 'Pages/Navbar';
import Footer from 'Pages/Footer';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#46B9F6',
    },
    dark: '#4D4D4D',
    // secondary: {
    //   main: green[500],
    // },
  },
});

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        {token ? (
          <>
            <Route exact path='/' component={Home} />
            <Route exact path='/logout' component={Logout} />
            <Redirect to='/' />
          </>
        ) : (
          <>
            <Route component={Navbar} />
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
              <Route exact path='/' component={Home} />
              <Redirect to='/' />
            </Switch>
            <Route component={Footer} />
          </>
        )}
      </ThemeProvider>
    </div>
  );
};

export default App;
