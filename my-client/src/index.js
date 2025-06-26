import React, { useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from "./store/DeviceStore";
import BasketStore from "./store/BasketStore";
import { createContext } from "react";

export const Context = createContext(null);

const root = createRoot(document.getElementById('root'));

const RootComponent = () => {
    const userStore = useMemo(() => new UserStore(), []);
    const deviceStore = useMemo(() => new DeviceStore(), []);
    const basketStore = useMemo(() => new BasketStore(), []);

    return (
        <Context.Provider value={{
            user: userStore,
            device: deviceStore,
            basket: basketStore
        }}>
            <App />
        </Context.Provider>
    );
};

root.render(<RootComponent />);