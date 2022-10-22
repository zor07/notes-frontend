import {useCommands} from "@remirror/react";
import React, {useState} from "react";
import {Input, message, Modal} from "antd";
import {VideoLineIcon} from "./Icons";

const AddYoutubeButton = () => {
    const [visible, setVisible] = React.useState(false);
    const [youTubeVideoLink, setYouTubeVideoLink] = useState('')

    const commands = useCommands();

    const showModal = () => {
        setVisible(true);
        setYouTubeVideoLink('')
    };

    const handleOk = () => {
        if (isValidYouTubeUrl(youTubeVideoLink)) {
            commands.addYouTubeVideo({ video: youTubeVideoLink})
            setVisible(false);
            setYouTubeVideoLink('')
        } else {
            message.warning("Please enter valid youtube video url", 2)
        }
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const isValidYouTubeUrl = (url: string) : boolean => {
        if (url !== undefined || url !== '') {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
            const match = url.match(regExp);
            return match && match[2].length === 11;
        }
    }

    return (
        <>
            <button className="remirror-role remirror-button remirror-tabbable"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={showModal}>
                <VideoLineIcon />
            </button>
            <Modal
                title="Insert YouTube video link"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Input placeholder="https://www.youtube.com/..."
                       value={youTubeVideoLink}
                       onChange={(e) => setYouTubeVideoLink(e.target.value)}/>
            </Modal>
        </>

    );
};

export default AddYoutubeButton