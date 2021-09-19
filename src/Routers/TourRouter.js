import React from 'react';

import { Switch, Route } from 'react-router-dom';
import EthicalTours from 'components/EthicalTours';
import EthicalToursDetails from 'components/EthicalTours/Details';

const TourRouter = ({ match }) => {
  return (
    <Switch>
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
      {/* <Route path={match.url + '/spiritual'} component={SpiritualTours} />
      <Route path={match.url + '/circuits'} component={CircuitsTours} /> */}
    </Switch>
  );
};

export default TourRouter;
