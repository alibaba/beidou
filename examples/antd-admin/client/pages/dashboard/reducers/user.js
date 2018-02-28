import { handleActions } from 'redux-actions';
import actions from '../actions';

const initialState = {
  currentItem: {},
  list: [],
  modalVisible: false,
  modalType: 'create',
  selectedRowKeys: [],
  isMotion: true,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  loading: {},
};

export default handleActions(
  {
    '@@init': state => ({
      state,
      ...initialState,
    }),
    [actions.user.showModal]: (state, { payload: { modalType } }) => ({
      ...state,
      modalType,
      modalVisible: true,
    }),
    [actions.user.hideModal]: state => ({
      ...state,
      modalVisible: false,
    }),
    [actions.user.createSuccess]: (state, { payload: { user } }) => ({
      ...state,
      list: [...state.list, user],
    }),
    [actions.user.fetchSuccess]: (state, { payload: { list } }) => ({
      ...state,
      list,
    }),

    [actions.user.deleteFromList]: (state, { payload: { user } }) => {
      const index = state.list.indexOf(user);
      return {
        ...state,
        list: [...state.list.slice(0, index), ...state.list.slice(index + 1)],
      };
    },
    [actions.user.switchIsMotion]: state => ({
      ...state,
      isMotion: !state.isMotion,
    }),
  },
  initialState
);
