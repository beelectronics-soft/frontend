import React, { useEffect, useState } from "react";
import { Redirect, useParams } from 'react-router'
import './Records.css';

import io from "socket.io-client";
import ToolbarClient from "../components/ToolbarClient";
import { getAuthContext } from "../utils/AuthContext";
import Record from "../components/Record";

import {socket3url} from "../utils/Env";
const socketS3 = io.connect(socket3url);


function Records() {
    const [ records, setRecords ] = useState([]);
    const [ status, setStatus ] = useState(true);

    const { currentUser } = getAuthContext();
    const { id } = useParams();

    if (status) {
        socketS3.emit('getRecords', currentUser.idUser);
        setStatus(false);
    }

    const renderRecords = () => {
        return records.map(record => (
            <Record record={record} />
        ));
    }

    useEffect(() => {
        socketS3.on('getRecords', res => {
            console.log(JSON.parse(res));
            setRecords(JSON.parse(res));
        })
    });

    if (currentUser === null) {
        return <Redirect to="/"/>
    }

    if (currentUser.idUser !== parseInt(id)) {
        return <Redirect to="/"/>
    }

    return (
        <div style={{ margin: '100px' }}>
            <ToolbarClient/><br></br>
            <div className="cartscreen">
                <div className="cartscreen__left">
                    <h2>User Record</h2>
                    { renderRecords() }
                </div>
            </div>
        </div>
    );
}

export default Records;