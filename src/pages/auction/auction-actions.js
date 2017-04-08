import { createAction } from 'redux-actions';

export const REQUEST_POST_INVOICE = 'REQUEST_POST_INVOICE';
export const SUCCESS_POST_INVOICE = 'SUCCESS_POST_INVOICE';
export const FAILURE_POST_INVOICE = 'FAILURE_POST_INVOICE';
export const addInvoice = createAction(REQUEST_POST_INVOICE);
export const successAddInvoice = createAction(SUCCESS_POST_INVOICE);
export const failureAddInvoice = createAction(FAILURE_POST_INVOICE);