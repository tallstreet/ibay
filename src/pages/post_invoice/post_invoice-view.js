import React from 'react';
import Header from '../../components/header';
import { Button } from "@blueprintjs/core";
import { DateTimePicker } from "@blueprintjs/datetime";
 

function renderError(errorMessage: string) {
  return (
    <div className="pt-callout pt-intent-danger">
      <h5>Error</h5>
      { errorMessage }
    </div>
  );
}

export default function SignIn({handleAddInvoice, handleChangeAmount, handleChangeFile, handleChangeMinBid, handleChangeReserve, handleDateChange, error, date }) {
  return (
    <div>
      <Header />
      <div className="body">
        <main className="content">
          <div className="pt-control-group pt-vertical post-invoice">
            <h1>Get Paid for your Invoice Immediately</h1>
            { error && renderError(error) }
            <div className="pt-input-group pt-large">
              <input type="file" className="pt-input" placeholder="File" onChange={handleChangeFile} />
            </div>
            <div className="pt-input-group pt-large">
              <input type="number" className="pt-input" placeholder="Amount" onChange={handleChangeAmount} />
            </div>
            <div className="pt-input-group pt-large">
              <input type="number" className="pt-input" placeholder="Min Bid Amount" onChange={handleChangeMinBid} />
            </div>
            <div className="pt-input-group pt-large">
              <input type="number" className="pt-input" placeholder="Reserve Amount" onChange={handleChangeReserve} />
            </div>
            <div className="pt-input-group pt-large">
              <DateTimePicker value={date} onChange={handleDateChange} />
            </div>
            <Button onClick={handleAddInvoice}  className="pt-button pt-large pt-intent-primary" iconName="pt-icon-log-in">Submit</Button>
          </div>
        </main>
      </div>
    </div>
  );
}