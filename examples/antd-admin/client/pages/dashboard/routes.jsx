import React from 'react';
import { Route, Switch } from 'react-router';
import Dashboard from './routes/dashboard';
import Users from './routes/user';
import Posts from './routes/post';
import ECharts from './routes/echarts';
import HighCharts from './routes/highcharts';
import Recharts from './routes/recharts';

// browserHistory.listen(() => {
//   window.NProgress.start();
//   window.NProgress.done();
// });

export default (
  <Switch>
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/user" component={Users} />
    <Route exact path="/post" component={Posts} />
    <Route exact path="/echarts" component={ECharts} />
    <Route exact path="/highcharts" component={HighCharts} />
    <Route exact path="/recharts" component={Recharts} />
  </Switch>
);
