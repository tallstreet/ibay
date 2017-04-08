import React from 'react';
import HeaderLogout from '../../components/header-logout';
import { Button } from "@blueprintjs/core";

function renderError(errorMessage: string) {
  return (
    <div className="pt-callout pt-intent-danger">
      <h5>Error</h5>
      { errorMessage }
    </div>
  );
}

export default function SignIn({handleSignIn, handleChangePassword, handleChangeEmail, error }) {
  return (
    <div>
      <HeaderLogout />
      <div className="body">
        <main className="content">
          <div className="pt-control-group pt-vertical sign-in">
            { error && renderError(error) }
            <div className="pt-input-group pt-large">
              <span className="pt-icon pt-icon-person"></span>
              <input type="email" className="pt-input" placeholder="Email" onChange={handleChangeEmail} />
            </div>
            <div className="pt-input-group pt-large">
              <span className="pt-icon pt-icon-lock"></span>
              <input type="password" className="pt-input" placeholder="Password" onChange={handleChangePassword} />
            </div>
            <Button onClick={handleSignIn}  className="pt-button pt-large pt-intent-primary" iconName="pt-icon-log-in">Login</Button>
          </div>
        </main>
      </div>
    </div>
  );
}