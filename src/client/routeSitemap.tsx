import * as React from 'react';
import { Switch, Route } from 'react-router';
export default (
    <Switch>
        <Route path="/" />
        <Route path="/user" />
        <Route path="/login" />
        <Route path="/register" />
    </Switch>
);
