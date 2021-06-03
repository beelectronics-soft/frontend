import React, { useEffect, useState } from "react";
import "./HomeClient.css";
import io from "socket.io-client";

import ToolbarClient from "../components/ToolbarClient";
import ProductCard from "../components/ProductCard";
import { getContext } from "../utils/CartContext";

import {socket1url} from "../utils/Env";
const socketS1 = io.connect(socket1url);


function HomeClient({ history }) {
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState(true);
    const { currentUser } = getContext();

    if (status) {
        socketS1.emit("getProducts");
        setStatus(false);
    }

    const renderProducts = () => {
        return products.map(product => (
            <ProductCard product={product} />
        ));
    }

    useEffect(() => {
        socketS1.on("getProducts", res => {
            setProducts(JSON.parse(res));
        });
    });
    
    if (currentUser) {
        if (currentUser.idUserType === 1) {
            history.push("/admin");
        }
        if (currentUser.idUserType === 2) {
            history.push("/storer");
        }
    }
    
    return (
        <div class="HomeClient_body">
            <ToolbarClient />
                <div classname="jumbotron" style={{ display: "flex", flexWrap: "wrap", alignContent: "center",justifyContent: "space-evenly", placeContent: "space-around", 
                alignItems: "center", backgroundColor: "#262626" }}>
                    {renderProducts()}
                </div>
        </div>
    );
}

export default HomeClient;