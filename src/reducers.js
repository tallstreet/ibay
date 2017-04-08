import { combineReducers } from 'redux';
import {
  SUCCESS_GET_USER
} from './actions';
import { reducer as routerReducer } from 'redux-tower';
import signin from './pages/signin/signin-reducers';
import postInvoice from './pages/post_invoice/post_invoice-reducers';
import Immutable from 'immutable';

const initial = Immutable.fromJS({
  loading: true,
  user: undefined
});

function app(state = initial, action) {
  switch (action.type) {
    case SUCCESS_GET_USER:
      return state.set('loading', false).set('user', action.payload.user);
    default: 
      return state;
  }
}

export default combineReducers(
  { signin, app, postInvoice, router: routerReducer }
);
