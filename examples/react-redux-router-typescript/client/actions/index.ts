import { createActions } from 'redux-actions';

export default createActions({
  GREET: undefined,
  SUCCESS: name => ({ name }),
  FAILED: message => ({ message }),
});
