import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { AppState } from '@core/common/rootReducer';
import { App } from '@core/app';
import { I18nextProvider } from 'react-i18next';

export const renderApp = (store: Store<AppState>, context?: object, location?: string | object, i18n?: any) => {
  const appRoot = (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <StaticRouter context={context} location={location}>
          <App />
        </StaticRouter>
      </Provider>
    </I18nextProvider>
  );

  return renderToString(appRoot);
};
