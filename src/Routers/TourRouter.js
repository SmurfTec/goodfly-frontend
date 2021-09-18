import React from 'react';

import { Switch, Route } from 'react-router-dom';
import EthicalTours from 'components/EthicalTours';

const TourRouter = ({ match }) => {
  return (
    <Switch>
      <Route path={match.url + '/ethical'} component={EthicalTours} />
      {/* <Route path={match.url + '/spiritual'} component={SpiritualTours} />
      <Route path={match.url + '/circuits'} component={CircuitsTours} /> */}
    </Switch>
  );
};

export default TourRouter;
