// @flow
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { Router } from 'redux-tower/lib/react';
import './index.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router />
  </Provider>,
document.getElementById('root'));
