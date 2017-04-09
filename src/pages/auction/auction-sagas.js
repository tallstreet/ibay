// @flow
import { fork, call, put, take, select } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import {
  REQUEST_AUCTION, successAuction, failureAuction, bidAdded,
  REQUEST_ADD_BID, auctionUpdated, updateAuction, UPDATE_AUCTION
} from './auction-actions';
import { SUCCESS_GET_USER } from '../../actions';
import type { IOEffect } from 'redux-saga/effects';
import { store } from 'redux';

const getId = (state) => state.router.params.id;
const customChannel = channel();

function loadAuction(auctionId) {
  return window.firebase.database().ref(`invoices/${auctionId}`).once('value').then((snapshot) => {
    return snapshot.val();
  });
}

function addBid(bid, auctionId) {
  const bidRef = window.firebase.database().ref(`invoices/${auctionId}/bids`).push();
  return bidRef.set({
    user: window.firebase.auth().currentUser.uid,
    bidTime: window.firebase.database.ServerValue.TIMESTAMP,
    bid
  });
}

function* load(): Generator<IOEffect,void,*> {
  while (true) {
    const action = yield take(REQUEST_AUCTION);
    const auction = yield call(loadAuction, action.payload);
    // const bidRef = window.firebase.database().ref(`invoices/${action.payload}/bids`);
    // bidRef.on('child_added', function (data) {
    //   customChannel.put(bidAdded({ bid: {...data.val(), id: data.key }}));
    // });
    const auctionRef = window.firebase.database().ref(`invoices/${action.payload}`);
    auctionRef.on('value', function (snapshot) {
      customChannel.put(auctionUpdated(snapshot.val()));
    });
    if (auction) {
      yield put(successAuction({ auction }));
    }
  }
}

function* bids(): Generator<IOEffect,void,*> {
  while (true) {
    const action = yield take(REQUEST_ADD_BID);
    const auctionId = yield select(getId);
    yield call(addBid, action.payload.bid, auctionId);
  }
}


function* auctionchanges(): Generator<IOEffect,void,*> {
  while (true) {
    const action = yield take(UPDATE_AUCTION);
    yield call(updateAuction, action.payload);
  }
}


function* updateauction(): Generator<IOEffect,void,*> {
  while (true) {
    const action = yield take(customChannel);
    yield put(action);
  }
}

export default function* rootSaga(): Generator<IOEffect,void,*> {
  yield fork(load);
  //yield fork(bids);
  yield fork(auctionchanges);
  yield fork(updateauction);
}
