import {useCommands} from "@remirror/react";
import React from "react";
import {RedoIcon} from "./Icons";

const Redo = () => {
    const actions = useCommands();
    const redo = () => {
        actions.redo()
    };

    return (
        <button className="remirror-role remirror-button remirror-tabbable"
                onClick={redo}>
                <RedoIcon />
        </button>
    )
}
export default Redo