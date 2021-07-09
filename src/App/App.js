import React, { useContext } from 'react';

import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'Contexts/AuthContext';

import Home from 'components/Home/index';
import Logout from 'Pages/Logout';
import Navbar from 'Pages/Navbar';
import Footer from 'Pages/Footer';

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className='App'>
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
    </div>
  );
};

export default App;
