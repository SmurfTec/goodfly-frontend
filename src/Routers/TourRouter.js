import React from 'react';

import { Switch, Route } from 'react-router-dom';
import EthicalTours from 'components/EthicalTours';
import EthicalToursDetails from 'components/EthicalTours/Details';
import FlashSale from 'components/FlashSale';

const TourRouter = ({ match }) => {
  return (
    <Switch>
      {/* Ethical Tours */}
      <Route
        exact
        path={match.url + '/ethical'}
        component={EthicalTours}
      />
      <Route
        exact
        path={match.url + '/ethical/:id'}
        component={EthicalToursDetails}
      />
      {/* Flash Sales */}
      <Route
        exact
        path={match.url + '/flash-sales'}
        component={FlashSale}
      />

      {/* <Route path={match.url + '/spiritual'} component={SpiritualTours} />
      <Route path={match.url + '/circuits'} component={CircuitsTours} /> */}
    </Switch>
  );
};

export default TourRouter;
