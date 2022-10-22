import {useActive, useCommands} from "@remirror/react";
import React from "react";
import {cx} from "remirror";
import {BoldIcon} from "./Icons";

const Bold = () => {
    const { toggleBold, focus } = useCommands();
    const active = useActive();

    return (
        <button className={cx(active.bold() ? 'remirror-button-active' : '', 'remirror-role remirror-button remirror-tabbable') }
                onClick={() => {
                    toggleBold();
                    focus();
                }}>
            <BoldIcon />
        </button>
    );
}

export default Bold