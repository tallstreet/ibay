import React from 'react';
import Header from '../../components/header';
import { Button } from "@blueprintjs/core";

export default function Auction({ auction, handleAddBid, handleChangeBid }) {
  return (
    <div>
      <Header />
      <div className="body">
        <main className="content">
          <div className="pt-control-group pt-vertical sign-in">
            <h1>Auction for Invoice</h1>
            <h2>Do you want to purchase invoice valued at £{ auction.amount }?</h2>
            <a href={auction.invoice} target="_blank">Download Invoice</a>
            <h3>Bids</h3>
            <table>
              <thead>
                <th>Bid</th>
                <th>User</th>
                <th>Time</th>
              </thead>
            {
              Object.keys(auction.bids).sort((a, b) => auction.bids[a].bidTime - auction.bids[b].bidTime).map((key) => {
                const bid = auction.bids[key];
                const newDate = new Date();
                newDate.setTime(bid.bidTime);
                const dateString = newDate.toUTCString();
                return (
                  <tr>
                    <td>{bid.bid}</td>
                    <td>{bid.user}</td>
                    <td>{dateString}</td>
                  </tr>
                );
              })
            }
            </table>
            <div className="pt-input-group pt-large">
              <input type="number" className="pt-input" placeholder="Bid Amount" onChange={handleChangeBid} />
            </div>
            <Button onClick={handleAddBid}  className="pt-button pt-large pt-intent-primary" iconName="pt-icon-log-in">Bid</Button>
          </div>
        </main>
      </div>
    </div>
  );
}