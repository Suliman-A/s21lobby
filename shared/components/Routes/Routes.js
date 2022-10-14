import React, {Fragment} from "react";
import {
    Route
} from "react-router-dom";

import Login from "../../../pages/login/Login";
import Register from "../../../pages/register/Register";
import Otp from "../../../pages/otp/Otp";
import RegisterSuccess from "../../../pages/register/RegisterSuccess/RegisterSuccess";
import Lobby from "../../../pages/lobby/Lobby";

import PrivateRoute from "../../functional/privateRoute";

/*
* ==================Routes specs=======================
* Component functionality - handle all pages routes and switching URL's
* =====================================================
*/ 
const Routes = () => {
    return (
        <Fragment>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route exact path="/">
                        <Login />
                </Route>

                <PrivateRoute>
                    <Route path="/lobby">
                        <Lobby />
                    </Route>
                    <Route path="/otp">
                        <Otp />
                    </Route>
                    <Route path="/register-success">
                        <RegisterSuccess />
                    </Route>
                </PrivateRoute>
        </Fragment>
    );
}

export default Routes;