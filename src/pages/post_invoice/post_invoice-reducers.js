import {
  REQUEST_POST_INVOICE, FAILURE_POST_INVOICE
} from './post_invoice-actions';
import Immutable from 'immutable';

const initial = Immutable.fromJS({
  error: undefined
});

export default function app(state = initial, { type, payload }) {
  switch (type) {
    case REQUEST_POST_INVOICE:
      return state.set('error', undefined);
    case FAILURE_POST_INVOICE:
      return state.set('error', payload.error.message);
    default: 
      return state;
  }
}