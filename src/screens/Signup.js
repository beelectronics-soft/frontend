import React, { useCallback, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Signup.css"

import { getAuthContext } from '../utils/AuthContext';

import io from "socket.io-client";
const socketS2 = io.connect("http://26.142.66.43:4001");

function Signup()
{
    const { currentUser, setCurrentUser } = getAuthContext();

    useEffect(() => {
        socketS2.on('signUp', res => {
            if (res.status === false) {
                alert( res.message );
                return;
            }
            if (res.status === true) {
                var data = JSON.parse(res.user);
                setCurrentUser({
                    idUser: data.idUser, 
                    idUserType: data.idUserType, 
                    nameUser: data.nameUser, 
                    passUser: data.passUser, 
                    imgUser: data.imgUser
                });
            } else {
                alert('Something went wrong');
            }
        });
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const { nameUser, passUser } = e.target.elements;

        socketS2.emit('signUp', {
            nameUser: nameUser.value, 
            passUser: passUser.value, 
            idUserType: 3, 
            imgUser: null
        });
    });

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
        <div class="Signup_body">
            <div class="panel">
                <div class="container">
                    <form onSubmit={ handleSubmit }>
                        <fieldset>
                            <legend>SignUp</legend>
                            <div class="form-group row">

                            </div>
                            <div class="form-group">
                                <label>User</label>
                                <input type="text" class="form-control" id="nameUser" name="nameUser" placeholder="Enter your username" 
                                required/>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" id="passUser" name="passUser" placeholder="Password" />
                            </div>
                            <button type="submit" class="btn btn-primary">Sign Up</button>
                            <Link to="/login">
                            <button class="btn btn-primary" style={{float: "right"}}>I have an account</button>
                            </Link>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Signup;