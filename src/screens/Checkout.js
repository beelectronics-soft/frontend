import React, { useCallback, useEffect, useState } from 'react';
import ToolbarClient from '../components/ToolbarClient';
import './Checkout.css';

import { getContext } from "../utils/CartContext";

import io from "socket.io-client";
import { getAuthContext } from '../utils/AuthContext';
const socketS3 = io.connect("http://26.142.66.43:4002");
const socketS1 = io.connect("http://26.142.66.43:4000");

const Checkout = ({ history }) => {
    const { cart, setCart } = getContext();
    const { currentUser } = getAuthContext();

    const [ total, setTotal ] = useState(0);
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ status, setStatus ] = useState(true);
    const [ account, setAccount ] = useState(null);
    const [ buttonStatus, setButtonStatus ] = useState({ code: "none", message: "Enter and check your card" });

    if (status) {
        socketS1.emit("calcTotalProducts", cart);
        socketS1.emit("calcTotalPrice", cart);
        socketS3.emit("checkPayStatus", { account, cart })
        setStatus(false);
    }

    useEffect(() => {
        socketS1.on("calcTotalProducts", res => {
            setTotal(res);
        });

        socketS1.on("calcTotalPrice", res => {
            setTotalPrice(res);
        });

        socketS3.on("checkPayStatus", res => {
            console.log(res);   
            setButtonStatus(res);
        });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSubmit = useCallback(e => {
        e.preventDefault();
        socketS3.emit('buyProducts', currentUser.idUser, account, cart);
    });

    useEffect(() => {
        socketS3.on('buyProducts', res => {
            if (res === true) {
                history.push("/");
                setCart([]);
            }   
        })
    });

    const renderButton = () => {
        if (buttonStatus.code === "ok") {
            return (
                <input type="submit" value="Finish" class="btn" />
            )
        } 

        return (
            <div>
                <input type="submit" value="Finish" class="btn" disabled/>
                <br></br>
                <p>{ buttonStatus.message }</p>
            </div>
        )
    }

    const saveAccount = () => {
        var idAccount = document.getElementById("idAccount").value;
        if (idAccount === "") {
            idAccount = null;
        }
        console.log(idAccount);
        setAccount({ id: idAccount })
        socketS3.emit("checkPayStatus", { id: idAccount }, cart );
    }

    return (
        <div class="body_Checkout">
            <div style={{ marginRight: '15%', marginLeft: '15%' }}>
                <ToolbarClient /><br></br>
            </div>
            <div class="row">
                <div class="col-75">
                    <div class="container">
                        <form onSubmit={ handleSubmit }>
                            <div class="row">
                                <div class="col-50">
                                    <h3>Payment</h3>
                                    <label for="fname">Accepted Cards</label>
                                    <div class="icon-container">
                                        <i class="fab fa-cc-visa" style={{ color: 'white', marginRight:"15px", fontSize: "50px"}}></i>
                                        <i class="fab fa-cc-amex" style={{ color: 'blue', marginRight:"15px", fontSize: "50px" }}></i>
                                        <i class="fab fa-cc-mastercard" style={{ color: 'red' , marginRight:"15px", fontSize: "50px"}}></i>
                                        <i class="fab fa-cc-discover" style={{ color: 'orange', marginRight:"15px", fontSize: "50px" }}></i>
                                    </div>
                                    <label for="ccnum">Credit card number</label>
                                    <input type="text" id="idAccount" name="idAccount" placeholder="1111222233334444" />
                                    <button className="btn" style={{ background: "#222" }} type="button"
                                    onClick={ saveAccount } >Press to check card</button>
                                </div>
                            </div>
                            { renderButton() }
                        </form>
                    </div>
                </div>

                <div class="col-50">
                    <div class="container">
                        <h4>Cart
                            <span class="price" style={{ color: 'white' }}>
                                <i class="fa fa-shopping-cart" style={{ marginRight: "8px"}}></i>
                                <b>{ total }</b>
                            </span>
                        </h4>
                        <hr />
                        <p>Total <span class="price" style={{ color: 'white' }}><b>${ totalPrice }</b></span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;

