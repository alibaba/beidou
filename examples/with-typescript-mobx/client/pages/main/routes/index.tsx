import * as React from 'react';
import { Route, Switch } from 'react-router';
import Create from './create';
import Show from './show';
import List from './list';

export default (
  <Switch>
    <Route exact path="/user/:id" component={Show} />
    <Route exact path="/create" component={Create} />
    <Route path="/" component={List} />
  </Switch>
);
