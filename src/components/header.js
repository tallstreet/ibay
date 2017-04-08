import React from 'react';
import { AnchorButton } from '@blueprintjs/core';
import { Link } from 'redux-tower/lib/react';

export default function Header() {
    return (
        <header>
            <nav className="pt-navbar">
            <div className="pt-navbar-group pt-align-left">
                <div className="pt-navbar-heading">IBay</div>
            </div>
            <div className="pt-navbar-group pt-align-right">
                <Link to="/post_invoice" className="pt-button pt-minimal pt-icon-add">Add Invoice</Link>
                <button className="pt-button pt-minimal pt-icon-document">Files</button>
                <span className="pt-navbar-divider"></span>
                <button className="pt-button pt-minimal pt-icon-user"></button>
                <button className="pt-button pt-minimal pt-icon-notifications"></button>
                <button className="pt-button pt-minimal pt-icon-cog"></button>
                <Link to='/logout' >Logout</Link>
            </div>
            </nav>
        </header>
    );
}