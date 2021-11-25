import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { handleCatch, makeReq } from 'Utils/constants';
import { AuthContext } from './AuthContext';

export const ToursContext = React.createContext();

export const ToursProvider = withRouter(({ children, history }) => {
  const { user, setUser } = useContext(AuthContext);

  const [tours, setTours] = useState();

  useEffect(() => {
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

  const favouriteTrip = async (id, toggleHandlingFavourite) => {
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
    } finally {
      toggleHandlingFavourite();
    }
  };

  const unFavouriteTrip = async (id, toggleHandlingFavourite) => {
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
    } finally {
      toggleHandlingFavourite();
    }
  };

  const cancelReservation = async (reservationId) => {
    try {
      await makeReq(`/purchases/${reservationId}/cancell`, {}, 'PATCH');
      toast.info('Your Cancellation Request is Submitted !');
    } catch (err) {
      handleCatch(err);
    }
  };

  const getTripById = (id) => tours?.find((el) => el._id === id);

  return (
    <ToursContext.Provider
      displayName='Tour Context'
      value={{
        tours,
        favouriteTrip,
        unFavouriteTrip,
        cancelReservation,
        getTripById,
      }}
    >
      {children}
    </ToursContext.Provider>
  );
});
