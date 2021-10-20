import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import { handleCatch, makeReq } from 'Utils/constants';
import { AuthContext } from './AuthContext';

export const ToursContext = React.createContext();

export const ToursProvider = withRouter(({ children, history }) => {
  const { user, setUser } = useContext(AuthContext);

  const [tours, setTours] = useState();

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const resData = await makeReq(`/trips`);
        // console.log(`resData`, resData);

        setTours(resData.trips);
      } catch (err) {
        setTours([]);
        handleCatch(err);
      }
    })();
  }, [user]);

  const favouriteTrip = async (id) => {
    try {
      const resData = await makeReq(
        `/trips/${id}/addToFavourites`,
        {},
        'PATCH'
      );
      // console.log(`resData`, resData);
      setUser(resData.user);
    } catch (err) {
      handleCatch(err);
    }
  };

  const unFavouriteTrip = async (id) => {
    try {
      const resData = await makeReq(
        `/trips/${id}/removeFromFavourites`,
        {},
        'PATCH'
      );
      // console.log(`resData`, resData);
      setUser(resData.user);
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <ToursContext.Provider
      value={{ tours, favouriteTrip, unFavouriteTrip }}
    >
      {children}
    </ToursContext.Provider>
  );
});
