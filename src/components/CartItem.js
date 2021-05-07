import React from 'react';
import './CartItem.css';
import { Link } from 'react-router-dom';

import { getContext } from '../utils/CartContext';

function CartItem({ product }) {
    const { cart } = getContext();

    const getStock = () => {
        for (var i = 0; i < cart.length; i++) {
            if (parseInt(cart[i].id) === product.idProduct) {
                return cart[i].qty;
            }
        }
    }

    return (
        <div className='cartitem'>
            <div className='cartitem__image'>
                <img
                    src={`data:image/png;base64,${product.imgProduct}`}
                    height="100px"
                    alt={product.nameProduct}
                />
            </div>
            <Link to={`/product/${product.idProduct}`}>
                <p>{product.nameProduct}</p>
            </Link>
            <p className="cartitem__price">${product.priceProduct}</p>
            <p>Qty: {getStock()}</p>
            <Link to='/cart'>
                <button className="cartitem__deletebutton" onClick={() => {
                    // eslint-disable-next-line array-callback-return
                    for (var i = 0; i < cart.length; i++) {
                        if (parseInt(cart[i].id) === product.idProduct) {
                            cart.splice(i, 1);
                        }
                    }
                    alert("Product removed");
                }}>
                    <i className="fas fa-trash"></i>
                </button>
            </Link>
        </div>
    );
}

export default CartItem;