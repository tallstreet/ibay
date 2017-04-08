// @flow
import { fork, call, put, take } from 'redux-saga/effects';
import {
  REQUEST_SIGN_OUT
} from './signout-actions';
import type { IOEffect } from 'redux-saga/effects';

function signOut(): Promise<Object,Error> {
  return window.firebase.auth().signOut()
    .catch(error => ({ error }));
}

function* handleRequestSignOut(): Generator<IOEffect,void,*> {
  while (true) {
    yield take(REQUEST_SIGN_OUT);
    yield call(signOut);
  }
}

export default function* rootSaga(): Generator<IOEffect,void,*> {
  yield fork(handleRequestSignOut);
}
