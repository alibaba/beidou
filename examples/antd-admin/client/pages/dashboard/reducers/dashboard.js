import { handleActions } from 'redux-actions';
import actions from '../actions';

const initialState = {
  weather: {
    city: '深圳',
    temperature: '30',
    name: '晴',
    icon: '//s5.sencdn.com/web/icons/3d_50/2.png',
  },
  sales: [],
  quote: {
    avatar:
      'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
  },
  numbers: [],
  recentSales: [],
  comments: [],
  completed: [],
  browser: [],
  cpu: {},
  user: {
    avatar:
      'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
  },
  loading: false,
};

export default handleActions(
  {
    '@@init': state => ({
      state,
      ...initialState,
    }),
    [actions.dashboard.fetchSuccess]: (state, { payload: { dashboard } }) => ({
      ...state,
      ...dashboard,
    }),
    [actions.common.toggleTheme]: (state, { payload: { theme } }) => ({
      ...state,
      theme,
    }),
  },
  initialState
);
