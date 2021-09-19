import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'App/App';

// * ---- Styles for some Packages------ * //
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import 'react-image-lightbox/style.css';
// -------------------------------- //

import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'Contexts/AuthContext';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
