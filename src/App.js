// @flow
import React, { Component, Element } from 'react';
import { connect } from 'react-redux';
import { SignIn, Timeline } from './pages';

class App extends Component {
  page(): Element<*> {
    const { app: { status } } = this.props;
    switch (status) {
    case 'init':
    case 'signin':
    case 'username':
      return <SignIn />;
    case 'ready':
      return <Timeline />;
    default:
      return <div>404 Not Found :(</div>;
    }
  }

  render(): Element<*> {
    return (
      <div>
        <h1>
          IBay
        </h1>
        {this.page()}
      </div>
    );
  }
}

function select({ app }) {
  return { app };
}

export default connect(select)(App);
