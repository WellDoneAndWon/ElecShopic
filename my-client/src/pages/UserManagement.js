import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Button, Form, Spinner } from 'react-bootstrap';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { fetchUsers, updateUserRole } from '../http/userAPI';
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/constants';
import { deleteUser } from '../http/userAPI';

const UserManagement = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Роль в UserManagement:", user.role); // Отладочное сообщение

        // Проверяем роль перед загрузкой данных
        if (user.role !== 'ADMIN') {
            console.log("Редирект на главную из UserManagement");
            navigate(SHOP_ROUTE);
            return;
        }

        // Загрузка пользователей
        fetchUsers()
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(e => {
                console.error("Ошибка загрузки пользователей:", e);
                setLoading(false);
            });
    }, [user.role, navigate]);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole);
            setUsers(users.map(u =>
                u.id === userId ? { ...u, role: newRole } : u
            ));
        } catch (e) {
            console.error("Ошибка изменения роли:", e);
            alert('Не удалось изменить роль пользователя');
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Удалить пользователя?')) {
            try {
                await deleteUser(id);
                setUsers(users.filter(u => u.id !== id));
            } catch (e) {
                alert('Ошибка удаления пользователя');
            }
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container>
            <h2 className="mb-4">Управление пользователями</h2>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Роль</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {users.map(u => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.email}</td>
                        <td>
                            <Form.Select
                                value={u.role}
                                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                disabled={user.user.id === u.id}
                            >
                                <option value="USER">Пользователь</option>
                                <option value="ADMIN">Администратор</option>
                            </Form.Select>
                        </td>
                        <td>
                            <Button
                                variant="danger"
                                disabled={user.user.id === u.id}
                                onClick={() => handleDeleteUser(u.id)} // <-- добавьте обработчик
                            >
                                Удалить
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
});

export default UserManagement;
