import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';

import { App } from '@core/app';
import { config } from '@core/common/appConfig';
import { configureStore } from '@core/common/store';

import { registerServiceWorker } from './serviceWorker';

import { useSSR } from 'react-i18next';
import './../../i18n';

const initialState = window.__INITIAL_STATE__;
const renderMethod = config.isDev && config.useRender ? render : hydrate;

const store = configureStore(initialState);

registerServiceWorker();

const ClientApp = () => {
  useSSR(window.initialI18nStore, window.initialLanguage);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

/**
 * To be able to reload the page
 * and see the latest code changes,
 * you must set the "localStorage.useRender" value in development mode
 */
renderMethod(
  <ClientApp/>,
  document.getElementById('root'),
  () => delete window.__INITIAL_STATE__
);
