import React, { useContext } from 'react';
import { Container, Table, Button, Badge, Image, Row, Col, Card } from 'react-bootstrap';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { Trash } from 'react-bootstrap-icons';

const Basket = observer(() => {
    const { basket } = useContext(Context);

    if (basket.items.length === 0) {
        return (
            <Container className="mt-5 text-center">
                <Card className="p-5 shadow-sm" style={{ maxWidth: 500, margin: "0 auto" }}>
                    <h2 className="mb-3">Ваша корзина пуста</h2>
                    <p className="text-muted">Добавьте товары из каталога</p>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center">Корзина покупок</h2>
            <Card className="shadow-sm">
                <Table responsive borderless className="align-middle mb-0">
                    <thead>
                    <tr style={{ background: "#f7fafc" }}>
                        <th style={{ width: 360 }}>Товар</th>
                        <th style={{ width: 120 }}>Цена</th>
                        <th style={{ width: 180 }}>Количество</th>
                        <th style={{ width: 120 }}>Сумма</th>
                        <th style={{ width: 80 }}>Удалить</th>
                    </tr>
                    </thead>
                    <tbody>
                    {basket.items.map(item => (
                        <tr key={item.device.id} style={{ borderBottom: "1.5px solid #f1f3f7" }}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <Image
                                        src={process.env.REACT_APP_API_URL + item.device.img}
                                        alt={item.device.name}
                                        width="54"
                                        height="54"
                                        rounded
                                        style={{ objectFit: "cover", background: "#f8f9fa", marginRight: 18 }}
                                    />
                                    <span style={{ fontWeight: 500, fontSize: 17 }}>{item.device.name}</span>
                                </div>
                            </td>
                            <td style={{ fontWeight: 600, fontSize: 17, color: "#1976d2" }}>
                                {item.device.price.toLocaleString()} ₽
                            </td>
                            <td>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => basket.decreaseQuantity(item.device.id)}
                                        style={{ fontSize: 18, width: 36, height: 36, borderRadius: 12 }}
                                    >
                                        –
                                    </Button>
                                    <span className="mx-3" style={{ fontSize: 18, minWidth: 24, textAlign: "center" }}>{item.quantity}</span>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => basket.increaseQuantity(item.device.id)}
                                        style={{ fontSize: 18, width: 36, height: 36, borderRadius: 12 }}
                                    >
                                        +
                                    </Button>
                                </div>
                            </td>
                            <td style={{ fontWeight: 600, fontSize: 17 }}>
                                {(item.device.price * item.quantity).toLocaleString()} ₽
                            </td>
                            <td>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => basket.removeFromBasket(item.device.id)}
                                    style={{ borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}
                                >
                                    <Trash size={18} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Card>
            <Row className="mt-4 align-items-center">
                <Col xs={12} md={6} className="mb-3 mb-md-0">
                    <h4>
                        Итого:&nbsp;
                        <Badge bg="primary" style={{ fontSize: 18, padding: "10px 18px", borderRadius: 16 }}>
                            {basket.totalPrice.toLocaleString()} ₽
                        </Badge>
                    </h4>
                </Col>
                <Col xs={12} md={6} className="text-md-end">
                    <Button variant="outline-danger" onClick={() => basket.clearBasket()} className="me-2" style={{ borderRadius: 14 }}>
                        Очистить корзину
                    </Button>
                    <Button variant="success" style={{ borderRadius: 14 }}>
                        Оформить заказ
                    </Button>
                </Col>
            </Row>
        </Container>
    );
});

export default Basket;
