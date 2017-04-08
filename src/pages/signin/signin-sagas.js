// @flow
import { fork, call, put, take } from 'redux-saga/effects';
import {
  REQUEST_SIGN_IN, successSignIn, failureSignIn
} from './signin-actions';
import type { IOEffect } from 'redux-saga/effects';

function signIn(email, password): Promise<Object,Error> {
  return window.firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => ({ user }))
    .catch(error => ({ error }));
}

function* handleRequestSignIn(): Generator<IOEffect,void,*> {
  while (true) {
    const action = yield take(REQUEST_SIGN_IN);
    const { user, error } = yield call(signIn, action.payload.email, action.payload.password);
    if (user && !error) {
      yield put(successSignIn({ user }));
    } else {
      yield put(failureSignIn({ error }));
    }
  }
}

export default function* rootSaga(): Generator<IOEffect,void,*> {
  yield fork(handleRequestSignIn);
}
