import { handleActions } from 'redux-actions';
import actions from '../actions';

const initialState = {
  currentItem: {},
  modalVisible: false,
  modalType: 'create',
  selectedRowKeys: [],
  isMotion: false,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  loading: {

  },
};

export default handleActions({
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
}, initialState);
