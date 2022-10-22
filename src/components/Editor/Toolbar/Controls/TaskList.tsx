import {useActive, useCommands} from "@remirror/react";
import React from "react";
import {TaskedListIcon} from "./Icons";
import {cx} from "remirror";

const TaskList = () => {
    const { toggleTaskList, focus } = useCommands();
    const active = useActive();

    return (
        <button className={cx(active.taskList() ? 'remirror-button-active' : '', 'remirror-role remirror-button remirror-tabbable') }
                onClick={() => {
                    toggleTaskList();
                    focus();
                }}>
            <TaskedListIcon/>
        </button>
    );
}

export default TaskList