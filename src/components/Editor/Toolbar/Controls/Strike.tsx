import {useActive, useCommands} from "@remirror/react";
import React from "react";
import {StrikethroughIcon} from "./Icons";
import {cx} from "remirror";

const Strike = () => {
    const { toggleStrike, focus } = useCommands();
    const active = useActive();

    return (
        <button className={cx(active.strike() ? 'remirror-button-active' : '', 'remirror-role remirror-button remirror-tabbable') }
                onClick={() => {
                    toggleStrike();
                    focus();
                }}>
            <StrikethroughIcon />
        </button>
    );
}

export default Strike