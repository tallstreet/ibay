import { createSelector } from 'reselect';

export const signInSelector = createSelector(
  [
    state => state.signin
  ],
  (signin) => {
    return {
      error: signin.get('error')
    };
  }
);