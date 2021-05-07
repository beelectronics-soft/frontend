import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getAuthContext } from "./AuthContext";

const AdminRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = getAuthContext();
    return (
        <Route
            {...rest}
            render = { routeProps => 
                !!currentUser ? (
                    (currentUser.idUserType === 1)? (
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

export default AdminRoute;