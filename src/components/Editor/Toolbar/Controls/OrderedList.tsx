import {useActive, useCommands} from "@remirror/react";
import React from "react";
import {OrderedListIcon} from "./Icons";
import {cx} from "remirror";

const OrderedList = () => {
    const { toggleOrderedList, focus } = useCommands();
    const active = useActive();

    return (
        <button className={cx(active.orderedList() ? 'remirror-button-active' : '', 'remirror-role remirror-button remirror-tabbable') }
                onClick={() => {
                    toggleOrderedList();
                    focus();
                }}>
            <OrderedListIcon/>
        </button>
    );
}

export default OrderedList