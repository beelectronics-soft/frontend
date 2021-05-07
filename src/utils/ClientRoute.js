import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getAuthContext } from "./AuthContext";

const ClientRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = getAuthContext();
    return (
        <Route
            {...rest}
            render = { routeProps => 
                !!currentUser ? (
                    (currentUser.idUserType === 3)? (
                        <RouteComponent {...routeProps} /> 
                    ) : (
                        <Redirect to="/" />    
                    )
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    )
}

export default ClientRoute;