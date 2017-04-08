import {
  SUCCESS_AUCTION
} from './auction-actions';
import Immutable from 'immutable';

const initial = Immutable.fromJS({
  auction: undefined
});

export default function app(state = initial, { type, payload }) {
  switch (type) {
    case SUCCESS_AUCTION:
      return state.set('auction', payload.auction);
    default: 
      return state;
  }
}