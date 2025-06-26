import React, { useContext } from 'react';
import {Container, Table, Button, Form, Badge} from 'react-bootstrap';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { Trash } from 'react-bootstrap-icons';

const Basket = observer(() => {
    const { basket } = useContext(Context);

    if (basket.items.length === 0) {
        return (
            <Container className="mt-5 text-center">
                <h2>Ваша корзина пуста</h2>
                <p>Добавьте товары из каталога</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Корзина покупок</h2>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Товар</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Сумма</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {basket.items.map(item => (
                    <tr key={item.device.id}>
                        <td>
                            <div className="d-flex align-items-center">
                                <img
                                    src={process.env.REACT_APP_API_URL + item.device.img}
                                    alt={item.device.name}
                                    width="50"
                                    className="me-3"
                                />
                                {item.device.name}
                            </div>
                        </td>
                        <td>{item.device.price} ₽</td>
                        <td>
                            <Form.Control
                                type="number"
                                min="1"
                                value={item.quantity}
                                style={{ width: '80px' }}
                                onChange={(e) =>
                                    basket.changeQuantity(item.device.id, parseInt(e.target.value) || 1)
                                }
                            />
                        </td>
                        <td>{item.device.price * item.quantity} ₽</td>
                        <td>
                            <Button
                                variant="outline-danger"
                                onClick={() => basket.removeFromBasket(item.device.id)}
                            >
                                <Trash />
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <h4>
                    Итого: <Badge bg="primary">{basket.totalPrice} ₽</Badge>
                </h4>
                <div>
                    <Button variant="outline-danger" onClick={() => basket.clearBasket()} className="me-2">
                        Очистить корзину
                    </Button>
                    <Button variant="success">Оформить заказ</Button>
                </div>
            </div>
        </Container>
    );
});

export default Basket;
