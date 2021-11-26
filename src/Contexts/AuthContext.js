import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { makeReq, handleCatch } from 'Utils/constants';

export const AuthContext = React.createContext();

export const AuthProvider = withRouter(({ children, history }) => {
  let tokenLocal;

  try {
    tokenLocal = window.localStorage.getItem('jwt');
  } catch (err) {
    tokenLocal = null;
  }

  const [token, setToken] = useState(tokenLocal);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    try {
      const res = await makeReq(`/users/me`, {}, 'GET');
      // console.log(`res`, res);

      setUser(res.user);
    } catch (err) {
      setToken(null);
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');

      // if (history.location !== '/') history.push('/');
    }
  };

  const signInUser = (tk, us) => {
    // console.log(`tk`, tk);
    // console.log(`us`, us);

    window.localStorage.setItem('jwt', tk);

    setTimeout(() => {
      setToken(tk);
      setUser(us);

      // history.push('/');
    }, 1000);
  };

  const logoutUser = () => {
    console.log('Logging Out');
    setToken(null);
    setUser(null);

    localStorage.removeItem('user');
    localStorage.removeItem('jwt');

    // setTimeout(() => {
    //   window.location.href = '/';
    // }, 1000);
  };

  const updateMe = async (updatedUser, onlyInContext) => {
    if (onlyInContext) {
      setUser({ ...user, ...updatedUser });
    } else
      try {
        const resData = await makeReq(
          `/users/me`,
          { body: { ...updatedUser } },
          'PATCH'
        );
        // console.log(`resData`, resData);
        toast.success('Profile Updated Successfully !');
        setUser(resData.user);
      } catch (err) {
        handleCatch(err);
      }
  };

  const makeNotficationsAsRead = async () => {
    try {
      await makeReq('/users/read-my-notifications', {}, 'PATCH');
    } catch (err) {
      handleCatch(err);
    }
    console.log('makenotificationRead');
  };

  return (
    <AuthContext.Provider
      displayName='Auth Context'
      value={{
        token,
        setToken,
        logoutUser,
        user,
        setUser,
        signInUser,
        updateMe,
        getMe,
        makeNotficationsAsRead,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
});
