import { createSelector } from 'reselect';

export const signInSelector = createSelector(
  [
    state => state.signin,
    state => state.app.get('user')
  ],
  (signin, user) => {
    return {
      error: signin.get('error'),
      user
    };
  }
);