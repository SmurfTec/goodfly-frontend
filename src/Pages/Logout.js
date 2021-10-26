import { AuthContext } from 'Contexts/AuthContext';
import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router';

const Logout = ({ location, history }) => {
  const { logoutUser, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) logoutUser();
    else history.push('/');
  }, [user, location]);

  return <div></div>;
};

export default withRouter(Logout);
