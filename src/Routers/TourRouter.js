import React from 'react';

import { Switch, Route } from 'react-router-dom';

// * Tours --------------------- * //
import EthicalTours from 'components/EthicalTours';
import EthicalToursDetails from 'components/FlashSale/Details';
import Destinations from 'components/Destinations';
import DestinationsDetails from 'components/Destinations/Details';
import FlashSale from 'components/FlashSale';
import FlashSaleDetails from 'components/FlashSale/Details';
import SpirutialTours from 'components/Spiritual';
import SpirutialToursDetails from 'components/Spiritual/Details';
import CreateTrip from 'components/CreateTrip';
// *  --------------------- * //

const TourRouter = ({ match }) => {
  return (
    <Switch>
      {/* Create A Trip */}
      <Route
        exact
        path={match.url + '/create'}
        component={CreateTrip}
      />

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

      {/* Spirutial Journeys */}
      <Route
        exact
        path={match.url + '/spiritual'}
        component={SpirutialTours}
      />
      <Route
        exact
        path={match.url + '/spiritual/:id'}
        component={SpirutialToursDetails}
      />

      {/* <Route path={match.url + '/spiritual'} component={SpiritualTours} />
      <Route path={match.url + '/circuits'} component={CircuitsTours} /> */}
    </Switch>
  );
};

export default TourRouter;