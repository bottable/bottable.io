import { Home, CreateTracker } from './pages';

import * as config from '../../config';

import React, { FC } from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';

const App: FC = () => {
  return (
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
  );
};

export default App;
