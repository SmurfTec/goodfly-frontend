import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

// * Tours --------------------- * //
import EthicalTours from 'components/EthicalTours';
import Promos from 'components/Promos';
import ExcursionsTours from 'components/Excursions';
import Destinations from 'components/Destinations';
import DestinationsDetails from 'components/Destinations/Details';
import FlashSale from 'components/FlashSale';
import SpirutialTours from 'components/Spiritual';
import CreateTrip from 'components/CreateTrip';
import Reservations from 'components/Reservations';
import TourDetails from 'components/common/tours/TourDetails';
import ProtechtedRoute from './ProtechtedRoute';

// *  --------------------- * //

const TourRouter = ({ match }) => {
  return (
    <Switch>
      {/* Create A Trip */}
      <Route exact path={match.url + '/create'} component={CreateTrip} />

      {/*  Tour Details Page */}
      <Route exact path={match.url + '/details/:id'} component={TourDetails} />

      {/* Ethical Tours Page */}
      <Route exact path={match.url + '/ethical'} component={EthicalTours} />

      {/* Promos Tours Page */}
      <Route exact path={match.url + '/promos'} component={Promos} />

      {/* Excursions Tours */}
      <Route
        exact
        path={match.url + '/excursions'}
        component={ExcursionsTours}
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
      <Route exact path={match.url + '/flash-sales'} component={FlashSale} />

      {/* Spirutial Journeys */}
      <Route exact path={match.url + '/spiritual'} component={SpirutialTours} />

      <ProtechtedRoute
        exact
        path={match.url + '/reservation/:id'}
        component={Reservations}
      />

      <Redirect to='/tours/ethical' />
    </Switch>
  );
};

export default TourRouter;
