// @flow
import { fork, select, take, put } from 'redux-saga/effects';
import { saga, INITIAL, ERROR } from 'redux-tower';
import { SignIn, Timeline, Loading, PostInvoice } from '../pages';
import { SUCCESS_GET_USER } from '../actions';
import { requestSignOut } from '../pages/signout/signout-actions';
import { createBrowserHistory as createHistory } from 'redux-tower';
import type { IOEffect } from 'redux-saga/effects';

// History
const history = createHistory();

const isLoggedIn = (state) => Boolean(state.app.get('user'));
const isLoading = (state) => Boolean(state.app.get('loading'));

// Routes
const routes = {
  [INITIAL]: Loading,
  '/login': function* logout() {
    yield SignIn;
    yield take(SUCCESS_GET_USER);
    yield '/';
  },
  '/post_invoice': function* home() {
    console.log('Check user login');
    yield take(SUCCESS_GET_USER);
    if (!(yield select(isLoggedIn))) {
      yield '/login';
    }
    console.log('Signed In');
    yield PostInvoice;
  },
  '/': function* home() {
    console.log('Check user login');
    yield take(SUCCESS_GET_USER);
    if (!(yield select(isLoggedIn))) {
      yield '/login';
    }
    console.log('Signed In');
    yield Loading;
  },
  '/logout': function* logout() {
    yield put(requestSignOut());
    yield Loading;
    yield '/login';
  },
  // Default error page (Optional)
  [ERROR]: Loading,
};

export default function* routesSaga(): Generator<IOEffect,void,*> {
  yield fork(saga, { history, routes });
}