import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import { SHOP_ROUTE } from '../utils/constants';
import { Context } from "../index";
import UserManagement from "../pages/UserManagement";
import Admin from "../pages/Admin";
import { observer } from "mobx-react-lite"; // Добавлен observer

const AppRouter = observer(() => { // Обернули в observer
    const { user } = useContext(Context);

    return (
        <Routes>
            {/* Основные защищенные маршруты */}
            {user.isAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            {/* Дополнительные маршруты только для администратора */}
            {user.isAuth && user.role === 'ADMIN' && (
                <Route path="/admin/users" element={<UserManagement />} />
            )}

            {/* Публичные маршруты */}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            {/* Резервный маршрут */}
            <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;
