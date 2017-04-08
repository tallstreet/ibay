import React from 'react';
import Header from '../components/header';
import { connect } from 'react-redux';
import { Spinner, Intent } from "@blueprintjs/core";

function Loading() {
  return (
    <div>
      <Header />
      <div className="body">
        <main className="content loading">
          <Spinner intent={Intent.PRIMARY} />
        </main>
      </div>
    </div>
  );
}

export default connect()(Loading);
