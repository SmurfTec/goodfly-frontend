import React, { useState, useEffect, useRef } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import relayPoints from './relayPointsData';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapBox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // * Paris as Center
  // const [lng, setLng] = useState(2.3522);
  // const [lat, setLat] = useState(48.8566);

  // * Testing
  const [lng, setLng] = useState(-80.128473);
  const [lat, setLat] = useState(25.781842);

  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.on('load', () => {
      relayPoints.forEach((relayPoint) => {
        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';

        // * Add Replay Point as Market to Map
        new mapboxgl.Marker({
          // color: '#0288D1',
          element: el,
          anchor: 'bottom',
        })
          .setLngLat(relayPoint.coordinates)
          .addTo(map.current);

        // * Add Popup on Marker
        new mapboxgl.Popup({
          offset: 30,
          closeButton: false,
        })
          .setLngLat(relayPoint.coordinates)
          .setHTML(`<p>Day ${relayPoint.day}: ${relayPoint.description}</p>`)
          .addTo(map.current);

        //  // Extend map bounds to include current relayPointation
        //  bounds.extend(relayPoint.coordinates);
      });
    });
  });

  return (
    <div>
      <div ref={mapContainer} className='map-container' />
    </div>
  );
};

export default MapBox;
