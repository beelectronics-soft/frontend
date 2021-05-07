import React, { useEffect, useState } from "react";
import "./ToolbarClient.css";

import { getContext } from "../utils/CartContext";
import { Link } from "react-router-dom";

import { getAuthContext } from '../utils/AuthContext';

import io from "socket.io-client";
const socketS1 = io.connect("http://26.142.66.43:4000");

function ToolbarClient() {
    const { cart }  = getContext();
    const [ count, setCount ] = useState(0);
    const [ status, setStatus ] = useState(true);
    const { currentUser, setCurrentUser } = getAuthContext();

    if (status) {
        socketS1.emit('calcTotalProducts', cart);
        setStatus(false);
    }
    

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        socketS1.on('calcTotalProducts', res => {
            setCount(res);
        })
    });

    // ban session
    const closeSession = () => {
        setCurrentUser(null);
    }

    const renderToggleSession = () => {
        if (currentUser) {
            return (
                <Link to="/" style={{ marginRight: '10px', color: '#EA3C53', marginLeft: "15px" }}
                    onClick={ closeSession } >
                        Log Out
                </Link>
            )
        }
        return (
            <Link to="/login" style={{ marginRight: '10px', color: '#50C878', marginLeft: "15px" }}
                onClick={ closeSession } >
                    Log in
            </Link>
        )
    }

    const renderInLogOptions = () => {
        if (currentUser) {
            return (
                <div>
                    <Link to={`/settings/${currentUser.idUser}`} style={{ marginRight: '10px' }}>My Account</Link>
                    <Link to={`/record/${currentUser.idUser}`} style={{ marginRight: '10px' }}>My Record</Link>
                </div>                
            )
        }
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link class="navbar-brand" to="/">Beelectronics</Link>
                <div class="collapse navbar-collapse" id="navbarColor02">
                    <ul class="navbar-nav mr-auto">
                        { renderInLogOptions() }
                    </ul>
                    <Link to="/cart" style={{ marginRight: '10px' }}>Cart</Link>
                    <span className = "cartlogo__badge">             
                        { count }
                    </span>
                    { renderToggleSession() }
                </div>
            </nav>
        </div>
    );
}

export default ToolbarClient;