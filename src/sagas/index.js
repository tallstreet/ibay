import { fork } from 'redux-saga/effects';
import signin from '../pages/signin/signin-sagas';
import signout from '../pages/signout/signout-sagas';
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
}
