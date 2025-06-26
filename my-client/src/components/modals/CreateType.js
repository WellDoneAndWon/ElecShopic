import React, {useState, useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {createType, deleteType} from "../../http/deviceAPI";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const CreateType = observer(({ show, onHide }) => {
    const { device } = useContext(Context);
    const [value, setValue] = useState('');

    const addType = () => {
        createType({name: value}).then(data => {
            device.setTypes([...device.types, data]);
            setValue('');
        });
    }

    const handleDelete = (id) => {
        if (window.confirm("Удалить этот тип?")) {
            deleteType(id).then(() => {
                device.deleteType(id);
            });
        }
    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Управление типами</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="mb-4">
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Введите название типа"
                    />
                </Form>

                <h6>Список типов:</h6>
                <ul className="list-group">
                    {device.types.map(type => (
                        <li
                            key={type.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            {type.name}
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(type.id)}
                            >
                                Удалить
                            </Button>
                        </li>
                    ))}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateType;
