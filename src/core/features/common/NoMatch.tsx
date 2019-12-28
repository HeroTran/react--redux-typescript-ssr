import React from 'react';
import { Route } from 'react-router-dom';

const NotFound = () => {
  return (
    <Route render={({ staticContext }) => {
      if (staticContext) {
        staticContext.statusCode = 404;
      }
      return (
        <React.Fragment>
          <h1>404 : Not Found</h1>
        </React.Fragment>
      );
    }}/>
  );
};

export default NotFound;
