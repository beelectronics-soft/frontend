import React, { useMemo, useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);

    const settings = useMemo(() => {
        return ({
            currentUser, 
            setCurrentUser
        })
    }, [currentUser, setCurrentUser]);

    return (
        <AuthContext.Provider value = {settings}>
            { children }
        </AuthContext.Provider>
    );
}

export function getAuthContext() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("Error from context")
    }

    return context;
}