// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SignInActionCreators from './auction-actions';
import PostInvoice from './auction-view';
import { signInSelector } from './auction-selectors';

class SignInContainer extends Component {
  props: {
    error: string,
    addInvoice: ({file: File, amount: string}) => void,
  }

  state: {
    file: File,
    amount: string
  };

  handleAddInvoice() {
    this.props.addInvoice({file: this.state.file, amount: this.state.amount});
  }

  handleChangeFile(event) {
    this.setState({file: event.target.files[0]});
  }

  handleChangeAmount(event) {
    this.setState({amount: event.target.value});
  }

  render() {
    return (
      <PostInvoice
        error={this.props.error}
        handleAddInvoice={this.handleAddInvoice.bind(this)}
        handleChangeFile={this.handleChangeFile.bind(this)}
        handleChangeAmount={this.handleChangeAmount.bind(this)}
      />
    );
  }
}


export default connect(
  signInSelector,
  dispatch => bindActionCreators({
    ...SignInActionCreators
  }, dispatch)
)(SignInContainer);
