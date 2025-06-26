import React, { useEffect, useState, useContext } from 'react';
import { Col, Container, Row, Image, Button, Card, Spinner, Alert } from "react-bootstrap";
import bigStar from '../assets/bigStar.png';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from "../http/deviceAPI";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import DeviceRating from '../components/DeviceRating';

const DevicePage = observer(() => {
    const [device, setDevice] = useState({ info: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { basket } = useContext(Context);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchOneDevice(id)
            .then(data => {
                setDevice(data);
                setAverageRating(data.rating || 0);
            })
            .catch(e => setError(e.response?.data?.message || "Ошибка загрузки устройства"))
            .finally(() => setLoading(false));
    }, [id]);

    const isInBasket = basket.items.some(item => item.device.id === device.id);

    const handleAddToBasket = () => {
        basket.addToBasket(device);
    };

    const handleRemoveFromBasket = () => {
        basket.removeFromBasket(device.id);
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <h3>Ошибка!</h3>
                    <p>{error}</p>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <div
                        style={{
                            width: '100%',
                            height: 300,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f8f9fa',
                            borderRadius: 12,
                            overflow: 'hidden'
                        }}
                    >
                        <Image
                            style={{
                                objectFit: 'contain',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                padding: 10,
                                borderRadius: 12,
                                background: '#fff'
                            }}
                            src={
                                device.img
                                    ? (device.img.startsWith('http') ? device.img : process.env.REACT_APP_API_URL + device.img)
                                    : 'https://via.placeholder.com/300'
                            }
                            alt={device.name}
                        />
                    </div>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <DeviceRating deviceId={device.id} onAvgChange={setAverageRating} />
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                background: `url(${bigStar}) no-repeat center center`,
                                width: 240,
                                height: 240,
                                backgroundSize: 'cover',
                                fontSize: 64,
                                color: '#fff',
                                fontWeight: 'bold',
                                textShadow: '0 0 3px #000'
                            }}
                        >
                            {averageRating.toFixed(1)}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around p-3"
                        style={{
                            width: 300,
                            height: 300,
                            fontSize: 32,
                            border: 'none',
                            borderRadius: 16,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h3>От: {device.price} руб.</h3>
                        {isInBasket ? (
                            <Button
                                variant="success"
                                onClick={handleRemoveFromBasket}
                                style={{ width: '100%', fontSize: '1.2rem' }}
                            >
                                ✓ В корзине
                            </Button>
                        ) : (
                            <Button
                                variant="outline-dark"
                                onClick={handleAddToBasket}
                                style={{ width: '100%', fontSize: '1.2rem' }}
                            >
                                Добавить в корзину
                            </Button>
                        )}
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {(device.info && device.info.length > 0 ? device.info : []).map((info, index) =>
                    <Row
                        key={info.id || index}
                        style={{
                            background: index % 2 === 0 ? 'lightgray' : 'transparent',
                            padding: 10
                        }}
                    >
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
});

export default DevicePage;
