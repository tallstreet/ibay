// @flow
import { fork, call, put, take, select } from 'redux-saga/effects';
import {
  REQUEST_AUCTION, successAuction, failureAuction, bidAdded
} from './auction-actions';
import { SUCCESS_GET_USER } from '../../actions';
import type { IOEffect } from 'redux-saga/effects';
import dispatch from 'redux';

const isLoggedIn = (state) => Boolean(state.app.get('user'));

function loadAuction(auctionId) {
  const bidRef = window.firebase.database().ref(`invoices/${auctionId}/bids`);
  bidRef.on('child_added', function (data) {
    dispatch(bidAdded({ bid:  data.val()}));
  });
  return window.firebase.database().ref(`invoices/${auctionId}`).once('value').then((snapshot) => {
    return snapshot.val();
  });
}

function* load(): Generator<IOEffect,void,*> {
  while (true) {
    const action = yield take(REQUEST_AUCTION);
    const auction = yield call(loadAuction, action.payload);
    if (auction) {
      yield put(successAuction({ auction }));
    }
  }
}

export default function* rootSaga(): Generator<IOEffect,void,*> {
  yield fork(load);
}
