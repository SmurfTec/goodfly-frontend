import Loading from 'components/common/Loading';
import { AuthContext } from 'Contexts/AuthContext';
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';

const ProtechtedRoute = ({ path, component: Component, ...rest }) => {
  const { token, user } = useContext(AuthContext);
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return token ? (
          user ? (
            <Component {...props} />
          ) : (
            <Loading />
          )
        ) : (
          <Redirect to={`/auth/login?redirect=${props.location.pathname}`} />
        );
      }}
    />
  );
};

export default ProtechtedRoute;
