import {useActive, useCommands} from "@remirror/react";
import React from "react";
import {UnderlineIcon} from "./Icons";
import {cx} from "remirror";

const Underline = () => {
    const { toggleUnderline, focus } = useCommands();
    const active = useActive();

    return (
        <button className={cx(active.underline() ? 'remirror-button-active' : '', 'remirror-role remirror-button remirror-tabbable') }
                onClick={() => {
                    toggleUnderline();
                    focus();
                }}>
            <UnderlineIcon/>
        </button>
    );
}

export default Underline