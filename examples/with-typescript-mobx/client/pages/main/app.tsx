import '@babel/polyfill';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import { History } from 'history';

import { IStore } from './store';
import Container from './container';

import './style.scss';
// const { Row, Col } = Grid;

interface IAppProps {
  store: IStore;
  history: History;
  [key: string]: any;
}

const App = ({ store, history }: IAppProps) => {
  return (
    <Provider {...store}>
      <Router history={history}>
        <Container />
      </Router>
    </Provider>
  );
};

export default hot(module)(App);
