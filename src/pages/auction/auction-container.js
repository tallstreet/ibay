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
    }
  }

  render() {
    return (
      <Auction
        auction={this.props.auction}
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
