import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { appRoutes } from './common/appRoutes';
import { PageTemplate } from './ui/templates';
import { renderRouting } from './common/renderRouting';

import './assets/styles/global.scss';

export const App = hot(() => {
  return <PageTemplate auth={false} title="React Typescript App">{renderRouting(appRoutes)}</PageTemplate>;
});
