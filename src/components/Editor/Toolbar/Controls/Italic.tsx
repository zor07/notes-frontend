import {useActive, useCommands} from "@remirror/react";
import React from "react";
import {ItalicIcon} from "./Icons";
import {cx} from "remirror";

const Italic = () => {
    const { toggleItalic, focus } = useCommands();
    const active = useActive();

    return (
        <button className={cx(active.italic() ? 'remirror-button-active' : '', 'remirror-role remirror-button remirror-tabbable') }
                onClick={() => {
                    toggleItalic();
                    focus();
                }}>
            <ItalicIcon/>
        </button>
    );
};

export default Italic