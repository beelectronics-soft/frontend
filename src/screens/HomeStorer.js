import React, { useState, useEffect } from "react";
import ProductStorerCard from "../components/ProductStorerCard";
import ToolbarStorer from "../components/ToolbarStorer";

import io from "socket.io-client";
const socketS1 = io.connect("http://26.142.66.43:4000");

function HomeStorer() {
    const [ products, setProducts ] = useState([]);
    const [ status, setStatus ] = useState(true);

    if (status) {
        socketS1.emit("getProducts");
        setStatus(false);
    }

    const renderProducts = () => {
        return products.map(product => (
            <ProductStorerCard product = {product} setStatus = { setStatus }/>
        ));
    }

    useEffect(() => {
        socketS1.on("getProducts", res => {
            setProducts(JSON.parse(res));
        });
    });

    return (
        <div style={{ margin: '100px' }}>
            <ToolbarStorer /><br></br>
            <div className="jumbotron" style={{ display: "flex", flexWrap: "wrap", alignContent: "center",justifyContent: "space-evenly", placeContent: "space-around", alignItems: "center" }}>
                { renderProducts() }
            </div>
        </div>
    );
}

export default HomeStorer;