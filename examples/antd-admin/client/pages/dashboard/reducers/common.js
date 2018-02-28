import { handleActions } from 'redux-actions';
import actions from '../actions';

const initialState = {
  theme: 'light',
};

export default handleActions(
  {
    '@@init': state => ({
      state,
      ...initialState,
    }),
    [actions.common.siderFold]: state => ({
      ...state,
      siderFolded: !state.siderFolded,
    }),
    [actions.common.toggleTheme]: (state, { payload: { theme } }) => ({
      ...state,
      theme,
    }),
  },
  initialState
);
