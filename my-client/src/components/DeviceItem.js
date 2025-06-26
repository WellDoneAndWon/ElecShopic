import React, { useContext } from 'react';
import { Card, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE, LOGIN_ROUTE } from "../utils/constants";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const DeviceItem = observer(({ device }) => {
    const navigate = useNavigate();
    const { user, basket } = useContext(Context);
    const basketItem = basket.items.find(item => item.device.id === device.id);

    const goToDevice = () => navigate(`${DEVICE_ROUTE}/${device.id}`);

    const handleAddToBasket = (e) => {
        e.stopPropagation();
        if (!user.isAuth) {
            navigate(LOGIN_ROUTE);
            return;
        }
        basket.addToBasket(device);
    };

    const handleIncrease = (e) => {
        e.stopPropagation();
        basket.increaseQuantity(device.id);
    };

    const handleDecrease = (e) => {
        e.stopPropagation();
        basket.decreaseQuantity(device.id);
    };

    return (
        <Card
            style={{
                minHeight: 360,
                cursor: 'pointer',
                padding: 16,
                borderRadius: 16,
                boxShadow: '0 2极px 8px rgba(0,0,0,0.05)',
                border: 'none'
            }}
            className="h-100 d-flex flex-column justify-content-between"
            onClick={goToDevice}
            tabIndex={0}
            role="button"
        >
            <div
                style={{
                    height: 160,
                    margin: '0 auto',
                    backgroundColor: '#f8f9fa',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                <Image
                    style={{
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        borderRadius: 12,
                        background: '#fff'
                    }}
                    src={process.env.REACT_APP_API_URL + device.img}
                    alt={device.name}
                />
            </div>
            <div style={{ marginTop: 14 }}>
                <div
                    style={{
                        fontWeight: 600,
                        fontSize: 16,
                        marginBottom: 5,
                        textAlign: 'center',
                        color: '#000',
                        minHeight: 40
                    }}
                >
                    {device.name}
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <span
                        style={{
                            fontWeight: 700,
                            fontSize: 19,
                            color: '#1976d2'
                        }}
                    >
                        {device.price} ₽
                    </span>
                    {basketItem ? (
                        <div className="d-flex align-items-center">
                            <Button
                                variant="success"
                                disabled
                                style={{
                                    height: '38px',
                                    borderRadius: 22,
                                    padding: '7px 18px',
                                    fontWeight: 600,
                                    fontSize: 15,
                                    boxShadow: '0 2px 4px rgba(0,123,255,0.07)',
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    marginRight: 8
                                }}
                            >
                                В корзине
                            </Button>
                            <div className="d-flex align-items-center">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={handleDecrease}
                                    style={{ height: '38px', padding: '2px 8px' }}
                                >
                                    -
                                </Button>
                                <span className="mx-2">{basketItem.quantity}</span>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={handleIncrease}
                                    style={{ height: '38px', padding: '2px 8px' }}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Button
                            variant="primary"
                            style={{
                                height: '38px',
                                borderRadius: 22,
                                padding: '7px 18px',
                                fontWeight: 600,
                                fontSize: 15,
                                boxShadow: '0 2px 4px rgba(0,123,255,0.07)'
                            }}
                            onClick={handleAddToBasket}
                        >
                            В корзину
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
});

export default DeviceItem;
