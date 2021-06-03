import React, { useEffect, useState } from "react"
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import ToolbarClient from "../components/ToolbarClient";
import { getContext } from "../utils/CartContext";
import "./ProductViewScreen.css";

import {socket1url} from "../utils/Env";
const socketS1 = io.connect(socket1url);


var qty;

function ProductViewScreen({ history }) {
    const { id } = useParams();
    const { cart } = getContext();
    const [ status, setStatus ] = useState(true);
    const [ product, setProduct ] = useState({});
    const [ inStock, setInStock ] = useState("In Stock");

    if (status) {
        socketS1.emit("getProduct", id);
        socketS1.emit("isInStock", id);
        setStatus(false);
    }

    useEffect(() => {
        socketS1.on("getProduct", res => {
            if (res) {
                qty = "1";
                setProduct(JSON.parse(res));
            } else {
                history.push("/");
            }
        });

        socketS1.on("isInStock", res => {
            setInStock(res);
        });
    });

    const renderStock = () => {
        if (inStock === "Not in stock") {
            const button = document.getElementById("button");
            button.disabled = true;
            button.style.background = "#575757";
            return <select disabled></select>;
        }

        var options = [];
        for (var i = 0; i < product.stockProduct; i++) {
            options.push(i+1);
        }

        const makeOption = (item) => {
            return <option value={item}>{item}</option>;
        }

        return (
            <select id="select" onChange = {() => {
                    qty = document.getElementById("select").value;
                }}>
                {options.map(makeOption)}
            </select>
        );
    }

    return (
        <div style={{ margin: '100px' }}>
            <ToolbarClient />
            <div className="productscreen" style={{ backgroundColor: '#262626' }}>
                <div className="productscreen__left">
                    <div className="left__image">
                        <img
                            src={`data:image/png;base64,${product.imgProduct}`}
                            height="400px"
                            alt={product.nameProduct}
                        />
                    </div>

                    <div className="left__info">
                        <p className="left__name">{product.nameProduct}</p>
                        <p className="left__price">${product.priceProduct}</p>
                        <p className="left__description">Category: {product.nameCategory}</p>
                    </div>
                </div>

                <div className="productscreen__right">
                    <div className="right__info">
                        <p>
                            Price: <span>${product.priceProduct}</span>
                        </p>
                        <p>
                            Stock: <span>{product.stockProduct}</span>
                        </p>
                        <p>
                            Status: <span>{inStock}</span>
                        </p>
                        <p>
                            Qty
                            { renderStock() }
                        </p>
                        <p>
                        <Link to="/">
                            <button id="button" type="button" onClick={() => {
                                const element = {
                                    id: id,
                                    qty: parseInt(qty), 
                                    price: product.priceProduct
                                }

                                var flag = true;
                                
                                // eslint-disable-next-line array-callback-return
                                cart.map(item => {
                                    if (item.id === id) {
                                        item.qty += element.qty;
                                        flag = false;
                                    }
                                });

                                if (flag) {
                                    cart.push(element);
                                }

                                alert("Product added");
                            }}>
                                Add to Cart
                            </button>
                        </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductViewScreen;

