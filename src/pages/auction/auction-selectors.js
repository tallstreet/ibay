import { createSelector } from 'reselect';

export const auctionSelector = createSelector(
  [
    state => state.auction
  ],
  (auction) => {
    return {
      auction: auction.get('auction').toJS()
    };
  }
);