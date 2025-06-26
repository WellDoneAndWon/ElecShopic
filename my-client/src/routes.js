import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import Basket from "./pages/Basket";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import ErrorBoundary from "./components/ErrorBoundary";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "./utils/constants";

// Маршруты для авторизованных пользователей
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
];

// Маршруты, доступные всем
export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: (props) => (
            <ErrorBoundary>
                <DevicePage {...props} />
            </ErrorBoundary>
        )
    }
];
