import {
  REQUEST_SIGN_IN, FAILURE_SIGN_IN
} from './signin-actions';
import Immutable from 'immutable';

const initial = Immutable.fromJS({
  error: undefined
});

export default function app(state = initial, { type, payload }) {
  switch (type) {
    case REQUEST_SIGN_IN:
      return state.set('error', undefined);
    case FAILURE_SIGN_IN:
      return state.set('error', payload.error.message);
    default: 
      return state;
  }
}