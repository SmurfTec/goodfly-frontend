import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

// * Auth Components --------------------- * //
import Login from 'components/auth/Login';
import SignUp from 'components/auth/SignUp';
import ResetPass from 'components/auth/ResetPass';
import ForgotPass from 'components/auth/ForgotPass';
import ConfirmMail from 'components/auth/ConfirmMail';
// *  --------------------- * //

const AuthRouter = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.url + '/login'} component={Login} />
      <Route exact path={match.url + '/signup'} component={SignUp} />
      <Route
        exact
        path={match.url + '/reset-password/:token'}
        component={ResetPass}
      />
      <Route
        exact
        path={match.url + '/forgot-password'}
        component={ForgotPass}
      />
      <Route
        exact
        path={match.url + '/confirmMail/:token'}
        component={ConfirmMail}
      />
      <Redirect to='/' />
    </Switch>
  );
};

export default AuthRouter;
