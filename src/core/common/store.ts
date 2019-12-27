import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { initializeApi } from '@core/api';

import { rootReducer, AppState } from './rootReducer';
import { config } from './appConfig';

export function configureStore(initialState?: AppState): Store<AppState> {
  const api = initializeApi(config.apiUrl);

  let middleware = applyMiddleware(thunk.withExtraArgument(api));

  if (config.isDev) {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer, initialState!, middleware);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const { reducer: neextReducer } = require('./rootReducer');
      store.replaceReducer(neextReducer);
    });
  }

  return store as Store<AppState>;
}
