import {
  SUCCESS_POST_INVOICE
} from './post_invoice-actions';
import Immutable from 'immutable';

const initial = Immutable.fromJS({
  invoice: undefined
});

export default function app(state = initial, { type, payload }) {
  switch (type) {
    case SUCCESS_POST_INVOICE:
      return state.set('invoice', payload.invoice);
    default: 
      return state;
  }
}