import React, { useEffect, useState } from "react";

import { getAuthContext } from "../utils/AuthContext";
import { getContext } from "../utils/CartContext";

import './CartView.css';

import io from "socket.io-client";
import CartItem from '../components/CartItem';
import ToolbarClient from "../components/ToolbarClient";
import { Link } from "react-router-dom";

import {socket1url} from "../utils/Env";
const socketS1 = io.connect(socket1url);


function CartView() {
    const { currentUser } = getAuthContext();
    const { cart } = getContext();

    const [ products, setProducts ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ status, setStatus ] = useState(true);

    if (cart.length !== products.length && status) {
        socketS1.emit("getCartProducts", cart);
        socketS1.emit("calcTotalPrice", cart);
        socketS1.emit("calcTotalProducts", cart);
        setStatus(false);
    }

    useEffect(() => {
        socketS1.on("getCartProducts", res => {
            setProducts(res);
            setStatus(true);
        });

        socketS1.on("calcTotalProducts", res => {
            setTotal(res);
        })

        socketS1.on("calcTotalPrice", res => {
            setTotalPrice(res);
        })
    });

    const renderCartItems = () => {
        return products.map(product => (
            <CartItem product={product} />
        ));
    }

    const renderCheckOut = () => {
        if (currentUser){
            return (
                <Link to='/checkout'>
                    <button>
                        Proceed to Checkout
                    </button>
                </Link>
            )
        }

        return (
            <div>
                <Link to='/checkout'>
                            <button disabled>
                                Proceed to Checkout
                            </button><br></br><br></br>
                <p>Sign in to proceed to checkout</p>
                </Link>
            </div>
        )
    }


    return (
        <div style={{ margin: '100px' }}>
            <ToolbarClient/><br></br>
            <div className="cartscreen">
                <div className="cartscreen__left">
                    <h2>Shopping Cart</h2>
                    { renderCartItems() }
                </div>      
                <div className="cartscreen__right">
                    <div className="cartscreen__info">
                        <p>Subtotal ({ total }) items</p>
                        <p>${ totalPrice }</p>
                    </div>
                    <div>
                        { renderCheckOut() }
                    </div>
                </div>      
            </div>
        </div>
    );
}

export default CartView;

