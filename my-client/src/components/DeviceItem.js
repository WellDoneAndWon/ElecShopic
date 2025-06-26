import React, { useContext } from 'react';
import { Card, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/constants";
import { Context } from "../index";

const DeviceItem = ({ device }) => {
    const navigate = useNavigate();
    const { basket } = useContext(Context);

    const goToDevice = () => navigate(`${DEVICE_ROUTE}/${device.id}`);
    const handleAddToBasket = (e) => {
        e.stopPropagation();
        basket.addToBasket(device);
    };

    return (
        <Card
            style={{
                minHeight: 360,
                cursor: 'pointer',
                padding: 16,
                borderRadius: 16,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
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
                    <Button
                        variant="primary"
                        style={{
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
                </div>
            </div>
        </Card>
    );
};

export default DeviceItem;
