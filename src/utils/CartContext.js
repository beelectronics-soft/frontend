import React, { useMemo, useState } from "react";

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
    const [ cart, setCart ] = useState([]);

    const settings = useMemo(() => {
        return ({
            cart, 
            setCart
        })
    }, [cart]);

    return (
        <CartContext.Provider value = {settings}>
            { children }
        </CartContext.Provider>
    );
}

export function getContext() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error("Error from context")
    }

    return context;
}