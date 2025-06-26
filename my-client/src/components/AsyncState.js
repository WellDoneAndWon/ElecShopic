import React from "react";
import { Spinner, Alert, Container } from "react-bootstrap";

const AsyncState = ({ loading, error, children }) => {
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
    return children;
};

export default AsyncState;
