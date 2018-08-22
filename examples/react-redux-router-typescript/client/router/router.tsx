'use strict';

import React from 'react';
import { BrowserRouter, StaticRouter, Route, Link } from 'react-router-dom';

import Loadable from 'react-loadable';

const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

export const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export const Dynamic = Loadable({
  loader: () => import('./dynamic'),
  loading: () => <div>loading</div>,
});

export const Dynamic1 = Loadable({
  loader: () => import('../container'),
  loading: () => <div>loading</div>,
});

export const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

export default props => (
  <Router {...props}>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dynamic">Dynamic</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
        <li>
          <Link to="/test">test</Link>
        </li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/dynamic" component={Dynamic}/>
      <Route path="/topics" component={Topics}/>
      <Route path="/test" component={Dynamic1}/>
    </div>
  </Router>
);
