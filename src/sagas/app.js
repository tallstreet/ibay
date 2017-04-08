// @flow
import { fork, call, put, take } from 'redux-saga/effects';
import {
  successGetUser, finishedLoading
} from '../actions';
import { eventChannel } from 'redux-saga';
import type { IOEffect } from 'redux-saga/effects';

function onAuthStatechangedChannel() {
  return eventChannel(emit => {
    return window.firebase.auth().onAuthStateChanged(function(user) {
      emit({ user });
    });
  })
}

function* watchAuthStateChanged() {
  const stateChanges = yield call(onAuthStatechangedChannel);

  while (true) {
    const { user } = yield take(stateChanges);
    yield put(successGetUser({ user }));
  }
}

export default function* rootSaga(): Generator<IOEffect,void,*> {
  yield fork(watchAuthStateChanged);
}
