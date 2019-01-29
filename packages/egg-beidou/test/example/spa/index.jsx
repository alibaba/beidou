
import { History, createMemoryHistory, createBrowserHistory } from 'history';
import React from 'react';
import App from './app';
import Side from './side';
import Home from './home';
import { Link, Route, Switch, Router ,IndexRoute} from 'react-router-dom';

function createHistory(basename = '') {
  const history = createBrowserHistory({
    basename,
  });

  if (!__CLIENT__) {
    history.listen = ()=>null;
  }

  return history;
}

/**
 * @export
 * @class Index
 * @extends {React.Component}
 */
export default class Index extends React.Component {

  static getPartial({ store }) {
    const html = (
        <h2>
          This is Title
        </h2>
    );
    return { html,htmls:[
      html
    ] };
  }

  static  custom(props){
    return {
      test:1
    };
  }

  static async script(props){
    return "<sript>window.name = 12345</sript>"
  }

  static async style(props){
    return "<style>body {background:red}</style>"
  }


  render() {
    const {location,ctx} = this.props;
    const search = ctx.querystring ? `?${ctx.querystring}` : '';
    const history = createHistory();
    history.location = {
      ...history.location,
      pathname: ctx.path,
      search,
      listen:()=>null
    };
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/side" component={Side}/>
            <Route path="/home" component={Home}/>
            <Route path="/*" component={App}/>
          </Switch>
        </Router>
      </div>
    );
  }
}
