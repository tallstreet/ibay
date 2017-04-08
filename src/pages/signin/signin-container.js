// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'redux-tower';
import * as SignInActionCreators from './signin-actions';
import SignIn from './signin-view';
import { signInSelector } from './signin-selectors';

class SignInContainer extends Component {
  props: {
    error: string,
    user: {},
    push: (string) => void,
    requestSignIn: ({email: string, password: string}) => void,
  }

  state: {
    email: string,
    password: string
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.push('/');
    }
  }

  handleSignIn() {
    this.props.requestSignIn({email: this.state.email, password: this.state.password});
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <SignIn
        error={this.props.error}
        handleSignIn={this.handleSignIn.bind(this)}
        handleChangeEmail={this.handleChangeEmail.bind(this)}
        handleChangePassword={this.handleChangePassword.bind(this)}
      />
    );
  }
}


export default connect(
  signInSelector,
  dispatch => bindActionCreators({
    ...SignInActionCreators,
    push: actions.push
  }, dispatch)
)(SignInContainer);
