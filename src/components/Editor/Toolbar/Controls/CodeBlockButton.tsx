import React, {useState} from "react";
import {useActive, useCommands} from "@remirror/react";
import {cx} from "remirror";
import {CodeIcon} from "./Icons";

type Props = {
    languages: string[];
}

const CodeBlockButton: React.FC<Props> = ({languages}) => {
    const { toggleCodeBlock, focus } = useCommands();
    const active = useActive(true);
    const [selectedLang, setSelectedLang] = useState(languages[0] ?? 'typescript');

    return (
        <>
            <select
                className="remirror-role remirror-select"
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}>
                {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                ))}
            </select>
            <button
                className={cx(active.codeBlock() ? "remirror-button-active" : "", "remirror-role remirror-button remirror-tabbable")}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                    toggleCodeBlock({ language: selectedLang });
                    focus();
                }}>
                <CodeIcon/>
            </button>
        </>
    );
};

export default CodeBlockButton;


