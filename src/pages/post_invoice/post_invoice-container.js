// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from './post_invoice-actions';
import PostInvoice from './post_invoice-view';
import { actions } from 'redux-tower';
import { postInvoiceSelector } from './post_invoice-selectors';

class PostInvoiceContainer extends Component {
  props: {
    push: (string) => void,
    invoice: string,
    addInvoice: ({file: File, amount: string}) => void,
  }

  state: {
    file: File,
    amount: string,
    minBid: string,
    reserve: string,
    endDate: number
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.invoice) {
      this.props.push(`/auction/${nextProps.invoice}`);
    }
  }

  handleAddInvoice() {
    this.props.addInvoice({file: this.state.file, amount: this.state.amount, minBid: this.state.minBid, reserve: this.state.reserve, endDate: this.state.endDate });
  }

  handleChangeFile(event) {
    this.setState({file: event.target.files[0]});
  }

  handleChangeAmount(event) {
    this.setState({amount: event.target.value});
  }

  handleChangeMinBid(event) {
    this.setState({minBid: event.target.value});
  }

  handleChangeReserve(event) {
    this.setState({reserve: event.target.value});
  }

  handleDateChange(endDate) {
    this.setState({endDate});
  }

  render() {
    return (
      <PostInvoice
        handleAddInvoice={this.handleAddInvoice.bind(this)}
        handleChangeFile={this.handleChangeFile.bind(this)}
        handleChangeAmount={this.handleChangeAmount.bind(this)}
        handleChangeMinBid={this.handleChangeMinBid.bind(this)}
        handleChangeReserve={this.handleChangeReserve.bind(this)}
        handleDateChange={this.handleDateChange.bind(this)}
        date={this.state && this.state.endDate}
      />
    );
  }
}


export default connect(
  postInvoiceSelector,
  dispatch => bindActionCreators({
    ...ActionCreators,
    push: actions.push
  }, dispatch)
)(PostInvoiceContainer);
