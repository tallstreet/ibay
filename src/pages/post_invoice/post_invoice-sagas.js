// @flow
import { fork, call, put, take } from 'redux-saga/effects';
import {
  REQUEST_POST_INVOICE, successAddInvoice, failureAddInvoice
} from './post_invoice-actions';
import type { IOEffect } from 'redux-saga/effects';

function addInvoice(file, amount, minBid, reserve, endDate) {
  // Create the file metadata
  return new Promise((resolve, reject) => {
    const metadata = {
      contentType: 'application/pdf'
    };
    const upload = window.firebase.storage().ref().child('invoices/' + file.name).put(file, metadata);

    upload.on(window.firebase.storage.TaskEvent.STATE_CHANGED,
    () => {}, 
    (error) => { reject(error); }, 
    () => {
      const result = {
        amount,
        invoice: upload.snapshot.downloadURL,
        minBid,
        reserve, 
        endDate,
        auctionStartTime: window.firebase.database.ServerValue.TIMESTAMP,
        user: window.firebase.auth().currentUser.uid
      };
      const key = window.firebase.database().ref('invoices').push(result).key;
      resolve(key);
    });
  });
}

function* handleAddInvoice(): Generator<IOEffect,void,*> {
  while (true) {
    const action = yield take(REQUEST_POST_INVOICE);
    const invoice = yield call(addInvoice, action.payload.file, action.payload.amount, action.payload.minBid, action.payload.reserve, action.payload.endDate);
    if (invoice) {
      yield put(successAddInvoice({ invoice }));
    }
  }
}

export default function* rootSaga(): Generator<IOEffect,void,*> {
  console.log("Test");
  yield fork(handleAddInvoice);
}
