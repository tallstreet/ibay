import { createSelector } from 'reselect';

export const postInvoiceSelector = createSelector(
  [
    state => state.postInvoice,
  ],
  (postInvoice) => {
    return {
      invoice: postInvoice.get('invoice')
    };
  }
);