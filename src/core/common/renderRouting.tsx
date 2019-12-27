import * as React from 'react';
import { Route, Switch } from 'react-router';

import { AppRoute } from './appRoutes';

export function renderRouting(routes?: AppRoute[]) {
  if (!routes) return null;

  return (
    <Switch>
      {routes.map(props => (
        <Route {...props} key={props.path} />
      ))}
    </Switch>
  );
}
