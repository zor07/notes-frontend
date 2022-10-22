import Undo from "./Controls/Undo";
import Redo from "./Controls/Redo";
import HeadingButtons from "./Controls/HeadingButtons";
import Bold from "./Controls/Bold";
import Italic from "./Controls/Italic";
import Underline from "./Controls/Underline";
import React from "react";
import SaveButton from "./Controls/SaveButton";
import BulletList from "./Controls/BulletList";
import OrderedList from "./Controls/OrderedList";
import TaskList from "./Controls/TaskList";
import Strike from "./Controls/Strike";
import AlignButtons from "./Controls/AlignButtons";
import AddYoutubeButton from "./Controls/AddYoutubeButton";
import AddImageButton from "./Controls/AddImageButton";
import {cx} from "remirror";
import css from './Controls/Controls.module.css'
import IncreaseFontSizeButton from "./Controls/IncreaseFontSizeButton";
import DecreaseFontSizeButton from "./Controls/DecreaseFontSizeButton";


type ToolbarPropsType = {
    saveContent: () => void
}

const Toolbar: React.FC<ToolbarPropsType> = ({saveContent}) => {

    return (
        <div className={cx( "remirror-role", "remirror-toolbar", css.toolbar)}>
            <div className="remirror-role remirror-group">
                <Undo/>
                <Redo/>
            </div>
            <hr role="separator" aria-orientation="vertical" className="remirror-role remirror-separator"/>
            <div className="remirror-role remirror-group">
                <SaveButton saveContent={saveContent}/>
            </div>
            <hr role="separator" aria-orientation="vertical" className="remirror-role remirror-separator"/>
            <div className="remirror-role remirror-group">
                <HeadingButtons />
            </div>
            <hr role="separator" aria-orientation="vertical" className="remirror-role remirror-separator"/>
            <div className="remirror-role remirror-group">
                <IncreaseFontSizeButton/>
                <DecreaseFontSizeButton/>
            </div>
            <hr role="separator" aria-orientation="vertical" className="remirror-role remirror-separator"/>
            <div className="remirror-role remirror-group">
                <Bold/>
                <Italic/>
                <Underline/>
                <Strike/>
            </div>
            <hr role="separator" aria-orientation="vertical" className="remirror-role remirror-separator"/>
            <div className="remirror-role remirror-group">
                <AlignButtons />
            </div>
            <hr role="separator" aria-orientation="vertical" className="remirror-role remirror-separator"/>
            <div className="remirror-role remirror-group">
                <BulletList />
                <OrderedList />
                <TaskList />
            </div>
            <hr role="separator" aria-orientation="vertical" className="remirror-role remirror-separator"/>
            <div className="remirror-role remirror-group">
                <AddYoutubeButton />
                <AddImageButton />
            </div>
        </div>
    )
}
export default Toolbar