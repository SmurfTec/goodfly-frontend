import React from 'react';

import { Switch, Route } from 'react-router-dom';

// * Tours --------------------- * //
import EthicalTours from 'components/EthicalTours';
import EthicalToursDetails from 'components/FlashSale/Details';
import Destinations from 'components/Destinations';
import DestinationsDetails from 'components/Destinations/Details';
import FlashSale from 'components/FlashSale';
import FlashSaleDetails from 'components/FlashSale/Details';
// *  --------------------- * //

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
      {/* Destinations */}
      <Route
        exact
        path={match.url + '/destinations'}
        component={Destinations}
      />
      <Route
        exact
        path={match.url + '/destinations/:name'}
        component={DestinationsDetails}
      />
      {/* Flash Sales */}
      <Route
        exact
        path={match.url + '/flash-sales'}
        component={FlashSale}
      />
      <Route
        exact
        path={match.url + '/flash-sales/:id'}
        component={FlashSaleDetails}
      />

      {/* <Route path={match.url + '/spiritual'} component={SpiritualTours} />
      <Route path={match.url + '/circuits'} component={CircuitsTours} /> */}
    </Switch>
  );
};

export default TourRouter;
