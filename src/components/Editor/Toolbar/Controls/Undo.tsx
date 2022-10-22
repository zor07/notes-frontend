import {useCommands} from "@remirror/react";
import React from "react";
import {UndoIcon} from "./Icons";

const Undo = () => {
    const actions = useCommands();
    const undo = () => {
        actions.undo()
    };

    return (
        <button className="remirror-role remirror-button remirror-tabbable"
                onClick={undo}>
            <UndoIcon />
        </button>
    )
}

export default Undo

