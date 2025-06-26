import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Dropdown, Form, Row, Col } from 'react-bootstrap';
import { Context } from '../../index';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';

const CreateDevice = observer(({ show, onHide }) => {
    const { device } = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
    }, [device]);

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i =>
            i.number === number ? { ...i, [key]: value } : i
        ));
    };

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setFile(null);
        setInfo([]);
        device.setSelectedType({});
        device.setSelectedBrand({});
        setError(null);
    };

    const addDevice = async () => {
        if (!name.trim()) {
            setError('Введите название устройства');
            return;
        }
        if (!price) {
            setError('Введите цену устройства');
            return;
        }
        if (!file) {
            setError('Выберите изображение устройства');
            return;
        }
        if (!device.selectedType?.id) {
            setError('Выберите тип устройства');
            return;
        }
        if (!device.selectedBrand?.id) {
            setError('Выберите бренд устройства');
            return;
        }

        const priceValue = Number(price);
        if (isNaN(priceValue) || priceValue <= 0) {
            setError('Цена должна быть положительным числом');
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', priceValue);
            formData.append('img', file);
            formData.append('brandId', device.selectedBrand.id);
            formData.append('typeId', device.selectedType.id);
            formData.append('info', JSON.stringify(info));

            await createDevice(formData);
            resetForm();
            onHide();
        } catch (e) {
            setError(e.response?.data?.message || 'Ошибка создания устройства');
            console.error("Ошибка создания устройства:", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={() => { resetForm(); onHide(); }}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавить устройство</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle
                            variant={device.selectedType?.id ? 'success' : 'secondary'}
                            disabled={loading}
                        >
                            {device.selectedType?.name || 'Выберите тип'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type => (
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle
                            variant={device.selectedBrand?.id ? 'success' : 'secondary'}
                            disabled={loading}
                        >
                            {device.selectedBrand?.name || 'Выберите бренд'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand => (
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Название устройства"
                        disabled={loading}
                    />

                    <Form.Control
                        value={price}
                        onChange={e => setPrice(e.target.value.replace(/[^0-9]/g, ''))}
                        className="mt-3"
                        placeholder="Цена"
                        disabled={loading}
                    />

                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                        disabled={loading}
                    />

                    <hr />
                    <Button
                        variant="outline-dark"
                        onClick={addInfo}
                        disabled={loading}
                    >
                        Добавить характеристику
                    </Button>

                    {info.map(i => (
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={e => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Название характеристики"
                                    disabled={loading}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={e => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Описание"
                                    disabled={loading}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => removeInfo(i.number)}
                                    disabled={loading}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    ))}

                    {error && <div className="text-danger mt-3">{error}</div>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-danger"
                    onClick={() => { resetForm(); onHide(); }}
                    disabled={loading}
                >
                    Закрыть
                </Button>
                <Button
                    variant="outline-success"
                    onClick={addDevice}
                    disabled={loading}
                >
                    {loading ? 'Добавление...' : 'Добавить'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;
