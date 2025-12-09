import {useCommands} from "@remirror/react";
import React, {useState} from "react";
import {Input, Modal} from "antd";
import {AddImageLineIcon} from "./Icons";

const AddImageButton = () => {
    const [visible, setVisible] = React.useState(false);
    const [imageSrc, setImageSrc] = useState('')

    const commands = useCommands();

    const showModal = () => {
        setVisible(true);
        setImageSrc('')
    };

    const handleOk = () => {
        commands.insertImage({ src: imageSrc})
        setVisible(false);
        setImageSrc('')
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <button className="remirror-role remirror-button remirror-tabbable"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={showModal}>
                <AddImageLineIcon/>
            </button>
            <Modal
                title="Insert image url"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}>

                <Input placeholder="Image url"
                       value={imageSrc}
                       onChange={(e) => setImageSrc(e.target.value)}/>
            </Modal>
        </>

    );
};

export default AddImageButton