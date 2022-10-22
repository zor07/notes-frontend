import {ItalicExtension} from "remirror/extensions";
import {MarkPasteRule} from "@remirror/pm/paste-rules";

class MyItalicExtension extends ItalicExtension {
    createPasteRules(): MarkPasteRule[] {
        return []
    }
}

export default MyItalicExtension