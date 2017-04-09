import {
  SUCCESS_AUCTION, SUCCESS_ADD_BID, SUCCESS_UPDATE_AUCTION
} from './auction-actions';
import Immutable from 'immutable';

const initial = Immutable.fromJS({
  auction: undefined
});

export default function app(state = initial, { type, payload }) {
  switch (type) {
    case SUCCESS_AUCTION:
      return state.set('auction', Immutable.fromJS(payload.auction));
    case SUCCESS_ADD_BID:
      return state.setIn(['auction', 'bids', payload.bid.id], payload.bid);
    case SUCCESS_UPDATE_AUCTION:
      return state.set('auction', Immutable.fromJS(payload));
    default: 
      return state;
  }
}