import OpenCloudApplicationsApi from 'open_payments_cloud_application_api';
import {
  SUCCESS_SIGN_IN,
  REQUEST_CREATE_POST, successCreatePost, failureCreatePost,
  syncAddedPost, syncRemovedPost
} from '../actions';
import * as db from '../firebase';

const login = OpenCloudApplicationsApi.LoginParams(
    739345648328338,
    "team-17",
    "8Wt7GLd^"
);


// function* runPostsCreate({ payload: { text } }) {
//   const userId = yield select(state => state.app.user);
//   const error = yield call(db.create, 'posts', id => {
//     return {
//       [`/posts/${id}`]: {
//         userId,
//         body: text,
//         likes: {},
//         created: (new Date()).getTime()
//       },
//       [`/timeline/${id}`]: true,
//     };
//   });

//   if (!error) {
//     yield put(successCreatePost());
//   } else {
//     yield put(failureCreatePost());
//   }
// }

// function* create() {
//   yield* takeEvery(REQUEST_CREATE_POST, runPostsCreate);
// }

// function* sync() {
//   yield fork(db.sync, 'posts', {
//     child_added: syncAddedPost,
//     child_removed: syncRemovedPost,
//   });
// }

// export default function* rootSaga() {
//   // Wait for sign-in
//   yield take(SUCCESS_SIGN_IN);

//   yield fork(create);
//   yield fork(sync);
// }
