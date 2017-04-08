import React from 'react';
import Header from '../../components/header';
import { Button } from "@blueprintjs/core";

export default function SignIn({handleAddInvoice, handleChangeAmount, handleChangeFile, error }) {
  return (
    <div>
      <Header />
      <div className="body">
        <main className="content">
          <div className="pt-control-group pt-vertical sign-in">
            <h1>Auction for Invoice</h1>
            
            <Button onClick={handleAddInvoice}  className="pt-button pt-large pt-intent-primary" iconName="pt-icon-log-in">Submit</Button>
          </div>
        </main>
      </div>
    </div>
  );
}