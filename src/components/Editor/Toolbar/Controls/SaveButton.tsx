import React from "react";


type SaveButtonPropsType = {
    saveContent: () => void
}

const SaveButton: React.FC<SaveButtonPropsType> = ({ saveContent }) => {
    return <button
        className="remirror-role remirror-button remirror-tabbable"
        onClick={saveContent}>Save</button>;
};
export default SaveButton