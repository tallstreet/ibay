import { createAction } from 'redux-actions';

export const SUCCESS_GET_USER = 'SUCCESS_GET_USER';
export const successGetUser = createAction(SUCCESS_GET_USER);

export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST';
export const SUCCESS_CREATE_POST = 'SUCCESS_CREATE_POST';
export const FAILURE_CREATE_PORT = 'FAILURE_CREATE_PORT';
export const requestCreatePost = createAction(REQUEST_CREATE_POST);
export const successCreatePost = createAction(SUCCESS_CREATE_POST);
export const failureCreatePost = createAction(FAILURE_CREATE_PORT);

export const SYNC_ADDED_POST = 'SYNC_ADDED_POST';
export const SYNC_REMOVED_POST = 'SYNC_REMOVED_POST';
export const syncAddedPost = createAction(SYNC_ADDED_POST);
export const syncRemovedPost = createAction(SYNC_REMOVED_POST);
