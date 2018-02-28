import { handleActions } from 'redux-actions';
import actions from '../actions';

const initialState = {
  greeting: '',
};
export default handleActions(
  {
    [actions.success]: (state, { payload: { name } }) => ({
      ...state,
      greeting: name,
    }),
  },
  initialState
);
