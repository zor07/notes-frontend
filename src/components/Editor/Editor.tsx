import React, {useCallback, useEffect, useMemo} from "react";
import "remirror/styles/all.css";

import {
    BoldExtension,
    BulletListExtension,
    DocExtension,
    FontSizeExtension,
    HeadingExtension,
    IframeExtension,
    ImageExtension,
    LinkExtension,
    NodeFormattingExtension,
    OrderedListExtension,
    CodeBlockExtension,
    TaskListItemExtension,
    UnderlineExtension,
    wysiwygPreset
} from "remirror/extensions";
import {EditorComponent, Remirror, useHelpers, useKeymap, useRemirror} from "@remirror/react";
import Toolbar from "./Toolbar/Toolbar";
import {htmlToProsemirrorNode, PrimitiveSelection, RemirrorContentType} from "remirror";
import MyItalicExtension from "./extensions/MyItalicExtension";
import css from './Editor.module.css';
import refractor, { RefractorSyntax } from "refractor/core";
import javascript from "refractor/lang/javascript";
import typescript from "refractor/lang/typescript";
import java from "refractor/lang/java";
import python from "refractor/lang/python";
import bash from "refractor/lang/bash";
import json from "refractor/lang/json";
import markdown from "refractor/lang/markdown";
import yaml from "refractor/lang/yaml";
import kotlin from "refractor/lang/kotlin";

const SUPPORTED_LANGUAGES: RefractorSyntax[] = [
    typescript,
    javascript,
    java,
    kotlin,
    python,
    bash,
    json,
    markdown,
    yaml,
];

const SUPPORTED_LANGUAGE_CODES = [
    'typescript',
    'javascript',
    'java',
    'kotlin',
    'python',
    'bash',
    'json',
    'markdown',
    'yaml',
];

// Register languages once for syntax highlighting
refractor.register(javascript);
refractor.register(typescript);
refractor.register(java);
refractor.register(python);
refractor.register(bash);
refractor.register(json);
refractor.register(markdown);
refractor.register(yaml);
refractor.register(kotlin);

const hooks = [
    () => {
        const {getJSON} = useHelpers();
        const handleSaveShortcut = useCallback(
            ({state}) => {
                console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);

                return true; // Prevents any further key handlers from being run.
            },
            []
        );
        // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
        useKeymap("Mod-s", handleSaveShortcut);
    }
];


type EditorPropsType = {
    content: RemirrorContentType,
    selection: PrimitiveSelection | null | undefined

    setEditorState: (EditorState) => void
    setShouldAutoSave: (boolean) => void
    setShouldSaveImmediately: (boolean) => void
}

const Editor: React.FC<EditorPropsType> = ({content, selection,  setEditorState, setShouldAutoSave, setShouldSaveImmediately}) => {

    const linkExtension = useMemo(() => {
        const extension = new LinkExtension({autoLink: true, defaultTarget: '_blank'});
        extension.addHandler('onClick', (_, data) => {
            window.open(data.href,'_blank');
            return true;
        });
        return extension;
    }, []);

    const {manager, state, setState} = useRemirror({
        extensions: () => [new BoldExtension({}),
            new DocExtension({content: 'heading block+'}),
            linkExtension,
            new MyItalicExtension(),
            new CodeBlockExtension({
                defaultLanguage: 'typescript',
                supportedLanguages: SUPPORTED_LANGUAGES
            }),
            new UnderlineExtension(),
            new HeadingExtension({}),
            new FontSizeExtension({}),
            new NodeFormattingExtension({}),
            new BulletListExtension({}),
            new OrderedListExtension(),
            new TaskListItemExtension(),
            new IframeExtension({ enableResizing: true }),
            new ImageExtension({ enableResizing: true }),
            ...wysiwygPreset()],
        content: {
            type: "doc",
            content: []
        },
        // selection: "start",
        stringHandler: htmlToProsemirrorNode
    });

    useEffect(() => {
        // make api request and get initial data then set content
        manager.view.updateState(
            manager.createState({
                content: content,
                selection: selection
            })
        );
        manager.view.focus();
    }, [content]);

    const handleChange = useCallback(({ tr, state }) => {
        setState(state)
        setEditorState(state)
        if (tr?.docChanged) {
            setShouldAutoSave(true)
        }
    }, [state]);

    return (
        <div className={css.editor}>
            <div className="remirror-theme">
                {/* the className is used to define css variables necessary for the editor */}
                <Remirror
                    manager={manager}
                    initialContent={state}
                    hooks={hooks}
                    onChange={handleChange}>

                    <Toolbar
                        saveContent={() => setShouldSaveImmediately(true)}
                        codeLanguages={SUPPORTED_LANGUAGE_CODES}
                    />

                    <div className="remirror-editor remirror-a11y-dark" >
                        <EditorComponent/>
                    </div>
                </Remirror>
            </div>
        </div>
    );
}

export default Editor
