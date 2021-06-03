import React, { useCallback, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Login.css"

import { getAuthContext } from '../utils/AuthContext';

import io from "socket.io-client";
import {socket2url} from "../utils/Env";
const socketS2 = io.connect(socket2url);


function Login() {
    const { currentUser, setCurrentUser } = getAuthContext();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const { nameUser, passUser } = e.target.elements;
        const user = {
            nameUser: nameUser.value, 
            passUser: passUser.value
        }

        socketS2.emit('checkLogin', user);
    });

    useEffect(() => {
        socketS2.on('checkLogin', res => {
            if (res.status === true) {
                setCurrentUser({
                    idUser: res.user.idUser, 
                    idUserType: res.user.idUserType, 
                    nameUser: res.user.nameUser, 
                    passUser: res.user.passUser, 
                    imgUser: res.user.imgUser
                });
            } else {
                alert(res.message);
            }
        });
    })

    if (currentUser) {
        if (currentUser.idUserType === 1) {
            return <Redirect to="/admin"/>
        }
        if (currentUser.idUserType === 2) {
            return <Redirect to="/storer"/>
        }
        if (currentUser.idUserType === 3) {
            return <Redirect to="/"/>
        }
    }

    return (
        <div class="Login_body">
            <div class="panel">
                <div class="container">
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Log in</legend>
                            <div class="form-group">
                                <label>User</label>
                                <input type="text" class="form-control" id="nameUser" name="nameUser" placeholder="Enter your username" 
                                required/>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" id="passUser" placeholder="Password" 
                                required/>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                            <Link to='/signup'>
                            <button type="button" class="btn btn-primary" style={{float: "right"}}>Create new account
                            </button>
                            </Link>
                        </fieldset>
                    </form>
                </div>
            </div>
            </div>
    );
}

export default Login;