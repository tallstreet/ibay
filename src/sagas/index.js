import { fork } from 'redux-saga/effects';
import signin from '../pages/signin/signin-sagas';
import signout from '../pages/signout/signout-sagas';
import postinvoice from '../pages/post_invoice/post_invoice-sagas';
import auction from '../pages/auction/auction-sagas';
import users from './users';
import posts from './posts';
import routes from './routes';
import app from './app';

export default function* rootSaga() {
  yield fork(signin);
  yield fork(signout);
  yield fork(app);
  //yield fork(users);
  //yield fork(posts);
  yield fork(routes);
  yield fork(postinvoice);
  yield fork(auction);
}
