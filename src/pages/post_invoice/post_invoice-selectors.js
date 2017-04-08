import { createSelector } from 'reselect';

export const signInSelector = createSelector(
  [
    state => state.postInvoice,
  ],
  (postInvoice) => {
    return {
      invoice: postInvoice.get('invoice')
    };
  }
);