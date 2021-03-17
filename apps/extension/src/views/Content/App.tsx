import { Home, CreateTracker } from './pages';

import * as config from '../../config';

import React, { FC } from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
});

require('typeface-work-sans');

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <MemoryRouter>
        <Switch>
          <Route exact path={config.ROUTES.index}>
            <Home />
          </Route>
          <Route path={config.ROUTES.tracker}>
            <CreateTracker />
          </Route>
        </Switch>
      </MemoryRouter>
    </ApolloProvider>
  );
};

export default App;
