import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirm = ({ show, onHide, onConfirm, title, message, loading }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} disabled={loading}>
                    Отмена
                </Button>
                <Button variant="danger" onClick={onConfirm} disabled={loading}>
                    {loading ? "Удаление..." : "Удалить"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirm;
