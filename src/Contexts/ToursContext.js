import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import { handleCatch, makeReq } from 'utils/constants';
import { AuthContext } from './AuthContext';

export const ToursContext = React.createContext();

export const ToursProvider = withRouter(({ children, history }) => {
  const { user } = useContext(AuthContext);

  const [tours, setTours] = useState();

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const resData = await makeReq(`/trips`);
        console.log(`resData`, resData);

        setTours(resData.trips);
      } catch (err) {
        setTours([]);
        handleCatch(err);
      }
    })();
  }, [user]);

  return (
    <ToursContext.Provider value={{ tours }}>
      {children}
    </ToursContext.Provider>
  );
});
