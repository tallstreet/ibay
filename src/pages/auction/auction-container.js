// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from './auction-actions';
import Auction from './auction-view';
import { auctionSelector } from './auction-selectors';

class AuctionContainer extends Component {
  props: {
    auction: {
      amount: string,
      invoice: string,
      user: string
    },
    addBid: ({bid: string}) => void,
  }

  state: {
    bidAmount: string
  };

  handleChangeBid(event) {
    this.setState({ bidAmount: event.target.value });
  }

  handleAddBid() {
    this.props.addBid({bid: this.state.bidAmount});
  }


  render() {
    return (
      <Auction
        auction={this.props.auction}
        handleChangeBid={this.handleChangeBid.bind(this)}
        handleAddBid={this.handleAddBid.bind(this)}
      />
    );
  }
}


export default connect(
  auctionSelector,
  dispatch => bindActionCreators({
    ...ActionCreators
  }, dispatch)
)(AuctionContainer);
