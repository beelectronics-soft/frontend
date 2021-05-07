import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getAuthContext } from "./AuthContext";

const StorerRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = getAuthContext();
    return (
        <Route
            {...rest}
            render = { routeProps => 
                !!currentUser ? (
                    (currentUser.idUserType === 2)? (
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

export default StorerRoute;