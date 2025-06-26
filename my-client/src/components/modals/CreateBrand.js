import React, {useState, useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {createBrand, deleteBrand} from "../../http/deviceAPI";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const CreateBrand = observer(({ show, onHide }) => {
    const { device } = useContext(Context);
    const [value, setValue] = useState('');

    const addBrand = () => {
        createBrand({name: value}).then(data => {
            device.setBrands([...device.brands, data]);
            setValue('');
        });
    }

    const handleDelete = (id) => {
        if (window.confirm("Удалить этот бренд?")) {
            deleteBrand(id).then(() => {
                device.deleteBrand(id);
            });
        }
    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Управление брендами</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="mb-4">
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Введите название бренда"
                    />
                </Form>

                <h6>Список брендов:</h6>
                <ul className="list-group">
                    {device.brands.map(brand => (
                        <li
                            key={brand.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            {brand.name}
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(brand.id)}
                            >
                                Удалить
                            </Button>
                        </li>
                    ))}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateBrand;
