import {useActive, useCommands} from "@remirror/react";
import React from "react";
import {BulletListIcon} from "./Icons";
import {cx} from "remirror";

const BulletList = () => {
    const { toggleBulletList, focus } = useCommands();
    const active = useActive();

    return (
        <button className={cx(active.bulletList() ? 'remirror-button-active' : '', 'remirror-role remirror-button remirror-tabbable') }
                onClick={() => {
                    toggleBulletList();
                    focus();
                }}>
            <BulletListIcon/>
        </button>
    );
}

export default BulletList