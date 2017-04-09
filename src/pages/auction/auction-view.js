import React from 'react';
import Header from '../../components/header';
import { Button } from "@blueprintjs/core";
import TimeAgo from 'react-timeago'

function showBids(auction) {
  return (
    <div>
    <h3>Bids</h3>
    <table>
      <thead>
        <tr>
          <th>Bid</th>
          <th>User</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
    {
      Object.keys(auction.bids).sort((a, b) => auction.bids[a].bidTime - auction.bids[b].bidTime).map((key) => {
        const bid = auction.bids[key];
        const newDate = new Date();
        newDate.setTime(bid.bidTime);
        const dateString = newDate.toUTCString();
        return (
          <tr key={bid.id}>
            <td>{bid.bid}</td>
            <td>{bid.user}</td>
            <td>{dateString}</td>
          </tr>
        );
      })
    }
    </tbody>
    </table>
    </div>
  )
}

function showForm(auction, handleAddBid, handleChangeBid, minBid) {
  return (
    <div>
      <h2>Do you want to purchase invoice valued at £{ auction.amount }?</h2>
      <div className="pt-input-group pt-large">
        <input type="number" min={minBid} defaultValue={minBid} className="pt-input" placeholder="Bid Amount" onChange={handleChangeBid} />
      </div>
      <Button onClick={handleAddBid}  className="pt-button pt-large pt-intent-primary" iconName="pt-icon-log-in">Bid</Button>
    </div>
  )
}

function openAuction(auction, handleAddBid, handleChangeBid, minBid) {
  return (
    <div className="pt-control-group pt-vertical sign-in">
      <h1>Auction for Invoice</h1>
      Auction Ends: <TimeAgo date={new Date(auction.endDate).toUTCString()} />
      <a href={auction.invoice} target="_blank">Download Invoice</a>
      { auction.bids && showBids(auction) }
      { auction.user !== window.firebase.auth().currentUser.uid && showForm(auction, handleAddBid, handleChangeBid, minBid) }
    </div>
  )
}

function showCard(auction) {
  return (
    <h3>
      Someone has purchased your invoice. You can retrieve the funds on this card: { auction.status.result.card }
    </h3>
  )
}


function closedAuction(auction, handleAddBid, handleChangeBid, minBid) {
  return (
    <div className="pt-control-group pt-vertical sign-in">
      <h1>Auction for Invoice</h1>
      <a href={auction.invoice} target="_blank">Download Invoice</a>
      { auction.bids && showBids(auction) }
      { auction.user === window.firebase.auth().currentUser.uid && auction.status && auction.status.result && showCard(auction) }
    </div>
  )
}


export default function Auction({ auction, handleAddBid, handleChangeBid, minBid }) {
  const closed = auction.endDate < new Date().getTime();
  return (
    <div>
      <Header />
      <div className="body">
        <main className="content">
          { !closed && openAuction(auction, handleAddBid, handleChangeBid, minBid) }
          { closed && closedAuction(auction, handleAddBid, handleChangeBid, minBid) }
        </main>
      </div>
    </div>
  );
}