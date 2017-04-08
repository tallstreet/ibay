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
  },
  '/post_invoice': function* home() {
    yield PostInvoice;
  },
  '/': function* home() {
    if (yield select(isLoggedIn)) {
      yield PostInvoice;
    } else {
      yield take(SUCCESS_GET_USER);
      if (!(yield select(isLoggedIn))) {
        yield '/login';
      }
    }
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