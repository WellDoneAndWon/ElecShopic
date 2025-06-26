import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react";
import { Context } from "./index";
import Spinner from "react-bootstrap/Spinner";
import { check } from "./http/userAPI";

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check()
            .then(data => {
                user.setUser(data);
                user.setIsAuth(true);
            })
            .catch(() => {
                user.setIsAuth(false);
            })
            .finally(() => setLoading(false));
    }, [user]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <Spinner animation="grow" variant="primary" />
            </div>
        );
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
