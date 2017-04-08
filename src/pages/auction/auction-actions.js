import { createAction } from 'redux-actions';

export const REQUEST_AUCTION = 'REQUEST_AUCTION';
export const SUCCESS_AUCTION = 'SUCCESS_AUCTION';
export const FAILURE_AUCTION = 'FAILURE_AUCTION';
export const loadAuction = createAction(REQUEST_AUCTION);
export const successAuction = createAction(SUCCESS_AUCTION);
export const failureAuction = createAction(FAILURE_AUCTION);
export const REQUEST_ADD_BID = 'REQUEST_ADD_BID';
export const SUCCESS_ADD_BID = 'SUCCESS_ADD_BID';
export const FAILURE_ADD_BID = 'FAILURE_ADD_BID';
export const addBid = createAction(REQUEST_ADD_BID);
export const bidAdded = createAction(SUCCESS_ADD_BID);
export const failureAddBid = createAction(FAILURE_ADD_BID);