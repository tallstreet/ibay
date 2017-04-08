// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SignInActionCreators from './post_invoice-actions';
import PostInvoice from './post_invoice-view';
import { actions } from 'redux-tower';
import { signInSelector } from './post_invoice-selectors';

class SignInContainer extends Component {
  props: {
    push: (string) => void,
    invoice: string,
    addInvoice: ({file: File, amount: string}) => void,
  }

  state: {
    file: File,
    amount: string
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.invoice) {
      this.props.push(`/auction/${nextProps.invoice}`);
    }
  }

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
    ...SignInActionCreators,
    push: actions.push
  }, dispatch)
)(SignInContainer);
