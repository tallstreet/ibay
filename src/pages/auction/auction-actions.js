import { createAction } from 'redux-actions';

export const REQUEST_AUCTION = 'REQUEST_AUCTION';
export const SUCCESS_AUCTION = 'SUCCESS_AUCTION';
export const FAILURE_AUCTION = 'FAILURE_AUCTION';
export const loadAuction = createAction(REQUEST_AUCTION);
export const successAuction = createAction(SUCCESS_AUCTION);
export const failureAuction = createAction(FAILURE_AUCTION);