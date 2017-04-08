import React from 'react';
import { Intent, Menu, MenuItem, MenuDivider } from "@blueprintjs/core";

export default function Header() {
    return (
        <nav className="nav">
            <Menu>
                <MenuItem
                    iconName="new-text-box"
                    text="New text box" />
                <MenuItem
                    iconName="new-object"
                    text="New object" />
                <MenuItem
                    iconName="new-link"
                    text="New link" />
                <MenuDivider />
                <MenuItem text="Settings..." iconName="cog" />
            </Menu>
        </nav>
    );
}