import React, { useEffect } from "react";
import {
    Routes,
    Route,
    BrowserRouter,

} from "react-router-dom";

import Login from '../pages/Login';
import Register from '../pages/Register';
import Main from '../pages/Main';
import Map from '../pages/Map';
import AuthService from '../services/auth';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../slicers/auth';
import MainLayout from "../layouts/MainLayout";
import OnlineUsers from "../pages/OnlineUsers";




function MainNavigation() {
    const authService = new AuthService();
    const dispatch = useDispatch();

    useEffect(() => {
      
        authService.getUser()
        .then(res =>{
            dispatch(setUser(res));
            console.log(res);
        } )
        .catch(err => console.log('Аккаунт нету'))
    }, [])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <MainLayout>
                        <Main />
                    </MainLayout>
                } />
                <Route path="/map" element={
                    <MainLayout>
                            <Map />
                    </MainLayout>
                } />
                <Route path="/online-users" element={<OnlineUsers></OnlineUsers>}>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default MainNavigation;