import {useCommands, useRemirrorContext} from "@remirror/react";
import React from "react";
import {cx} from "remirror";
import {ArrowDownIcon} from "./Icons";
import css from './Controls.module.css'


const DecreaseFontSizeButton = () => {
    const {decreaseFontSize} = useCommands();
    const {view} = useRemirrorContext({autoUpdate: true});
    const head = view.state.selection.head
    const anchor = view.state.selection.anchor
    const disabled = head === anchor


    return (
        <button className={cx(disabled ? `${css.disabled}` : 'remirror-role remirror-button remirror-tabbable')}
                onMouseDown={(event) => event.preventDefault()}
                disabled={disabled}
                onClick={() => {
                    decreaseFontSize()
                }}>
            <ArrowDownIcon/>
        </button>
    );
}

export default DecreaseFontSizeButton