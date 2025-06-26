import { Context } from "../index";
import { Card, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";

const BrandBar = observer(() => {
    const { device } = useContext(Context);

    return (
        <Row
            className="d-flex flex-wrap"
            style={{ gap: '8px' }}
        >
            {device.brands.map(brand =>
                <Card
                    key={brand.id}
                    className="p-2"
                    style={{
                        cursor: 'pointer',
                        borderRadius: '8px',
                        width: 'auto',
                        padding: '8px 16px',
                        textAlign: 'center',
                        userSelect: 'none',
                        fontSize: '0.9rem',
                        border: brand.id === device.selectedBrand?.id ? '2px solid #007bff' : '1px solid lightgray',
                        background: brand.id === device.selectedBrand?.id ? '#e9f5ff' : 'white',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.3s ease'
                    }}
                    onClick={() => {
                        if (brand.id === device.selectedBrand?.id) {
                            device.setSelectedBrand({});
                        } else {
                            device.setSelectedBrand(brand);
                        }
                    }}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;
