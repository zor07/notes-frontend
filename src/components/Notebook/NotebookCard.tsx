import React from "react";
import {NotebookType} from "../../redux/notebook-reducer";
import css from "./Notebooks.module.css";
import {Button, Card, Popconfirm} from "antd";
import {DeleteOutlined, ArrowRightOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import {useNavigate} from "react-router-dom";

type MapStatePropsType = {
    notebook: NotebookType
}

type MapDispatchPropsType = {
    onDeleteNotebook: (notebookId: string) => void
}

type NotebookCardType = MapStatePropsType & MapDispatchPropsType

const NotebookCard: React.FC<NotebookCardType> = ({notebook, onDeleteNotebook}) => {

    const navigate = useNavigate()

    return (
        <div className={css.notebookCard}>
            <Card title={<Title level={5}>{notebook.name}</Title>}
                  style={{width: 250}}
                  actions={[
                      <Popconfirm placement="right"
                                  title={`Are you shure you want to delete [${notebook.name}] ?`}
                                  onConfirm={() => onDeleteNotebook(notebook.id)}
                                  okText="Yes"
                                  cancelText="No">
                          <Button danger icon={<DeleteOutlined/>}/>
                      </Popconfirm>,
                      <Button onClick={() => navigate(`/notebooks/${notebook.id}/notes`)}
                              icon={<ArrowRightOutlined />}/>
                  ]}>
                <p>{notebook.description}</p>
            </Card>
        </div>
    )
}

export default NotebookCard