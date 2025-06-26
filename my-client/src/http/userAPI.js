import { jwtDecode } from "jwt-decode";
import { $authHost, $host } from "./index";

export const registration = async (email, password, role = 'USER') => {
    const { data } = await $host.post('api/user/registration', { email, password, role });
    localStorage.setItem('token', data.token);
    const decoded = jwtDecode(data.token); // Декодируем токен
    return {
        ...decoded,
        role: decoded.role // Берем роль из декодированного токена
    };
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);

    // Декодируем токен и логируем данные
    const decoded = jwtDecode(data.token);
    console.log("Декодированные данные:", decoded);

    return {
        ...decoded,
        role: decoded.role
    };
};


export const check = async () => {
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    const decoded = jwtDecode(data.token); // Декодируем токен
    return {
        ...decoded,
        role: decoded.role // Берем роль из декодированного токена
    };
};

// Новые функции для управления пользователями (только для ADMIN)
export const fetchUsers = async () => {
    const { data } = await $authHost.get('api/user/admin');
    return data;
};

export const updateUserRole = async (id, role) => {
    const { data } = await $authHost.put(`api/user/${id}/role`, { role });
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await $authHost.delete(`api/user/${id}`);
    return data;
};
