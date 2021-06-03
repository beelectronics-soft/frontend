import React, { useEffect, useState } from "react"
import StorerCard from "../components/StorerCard";
import ToolbarAdmin from "../components/ToolbarAdmin"
import './HomeAdmin.css';

import io from "socket.io-client";

import {socket2url} from "../utils/Env";
const socketS2 = io.connect(socket2url);


function HomeAdmin() {
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState(true);

    if (status) {
        socketS2.emit("getStorers");
        setStatus(false);
    }

    useEffect(() => {
        socketS2.on('getStorers', res => {
            setUsers(JSON.parse(res));
        });
    });

    const renderUsers = () => {
        return users.map(user => (
            <StorerCard user={user} />
        ));
    }

    return (
        <div class="HomeAdmin_body">
            <ToolbarAdmin /><br></br>
            <div className="jumbotron" style={{
                display: "flex", flexWrap: "wrap", alignContent: "center", justifyContent: "space-evenly",placeContent: "center", alignItems: "center"}} >
                    { renderUsers() }
            </div>
        </div>

    );
}

export default HomeAdmin;