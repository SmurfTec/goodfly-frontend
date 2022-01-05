import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'App/App';

import { ToastContainer } from 'react-toastify';

// ^ Translation Packages
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// * ---- Styles for some Packages------ * //
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import 'react-image-lightbox/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'mapbox-gl/dist/mapbox-gl.css';
// -------------------------------- //

import { BrowserRouter } from 'react-router-dom';
import Loading from 'components/common/Loading';

import { AuthProvider } from 'Contexts/AuthContext';
import { ToursProvider } from 'Contexts/ToursContext';
import { StoreProvider } from 'Contexts/StoreContext';
import { SocketProvider } from 'Contexts/SocketContext';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar', 'fr'],
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  });

const loadingMarkup = (
  <>
    <Loading />
  </>
);

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <ToursProvider>
          <StoreProvider>
            <ToastContainer
              position='top-right'
              autoClose={3000}
              hideProgressBar
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Suspense fallback={loadingMarkup}>
              <App />
            </Suspense>
          </StoreProvider>
        </ToursProvider>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
