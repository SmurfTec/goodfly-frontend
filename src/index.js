import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'App/App';

import { ToastContainer } from 'react-toastify';

// * ---- Styles for some Packages------ * //
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import 'react-image-lightbox/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

// -------------------------------- //

import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'Contexts/AuthContext';
import { ToursProvider } from 'Contexts/ToursContext';
import { StoreProvider } from 'Contexts/StoreContext';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <ToursProvider>
        <StoreProvider>
          <ToastContainer
            position='top-right'
            autoClose={4000}
            hideProgressBar
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <App />
        </StoreProvider>
      </ToursProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
