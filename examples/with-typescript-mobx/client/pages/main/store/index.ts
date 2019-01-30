import { createBrowserHistory, History } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import RouterStore from './router';
import UserStore from './user';

interface IStoreCreateProps {
  initState: {
    [key: string]: any;
  };
  basename?: string;
  pathname?: string;
}

export interface IStore {
  router?: RouterStore;
  user?: UserStore;
  [key: string]: any;
}

interface IStoreAndHistory {
  store: IStore;
  history: History;
}

export default function createStore({ initState, basename, pathname }: IStoreCreateProps): IStoreAndHistory {
  const browserHistory = createBrowserHistory({
    basename,
  });

  if (pathname) {
    browserHistory.location.pathname = pathname;
  }

  const routerStore = new RouterStore();

  const history = syncHistoryWithStore(browserHistory, routerStore) as History;
  const store = {
    router: routerStore,
    user: new UserStore(initState.user),
  };

  return {
    store,
    history,
  };
}
