import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';

import ToolbarClient from '../components/ToolbarClient';
import ToolbarAdmin from '../components/ToolbarAdmin';
import ToolbarStorer from '../components/ToolbarStorer';

import { getAuthContext } from '../utils/AuthContext';

import io from "socket.io-client";
import {socket2url} from "../utils/Env";
const socketS2 = io.connect(socket2url);


const Settings = ({ history }) => {
    const [ upUser, setUpUser ] = useState({});
    const { currentUser, setCurrentUser } = getAuthContext();
    const { id } = useParams();

    useEffect(() => {
        socketS2.on('updateUser', res => {
            if (res.status === true) {
                setCurrentUser(upUser);
                if (upUser.idUserType === 1) {
                    history.push('/admin');    
                } 
                if (upUser.idUserType === 2) {
                    history.push('/storer');    
                }
                if (upUser.idUserType === 3) {
                    history.push('/');    
                }
            } else {
                alert(res.message);
            }
        });

        socketS2.on('deleteUser', res => {
            setCurrentUser(null);
            history.push('/');
        });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const { nameUser, passUser } = e.target.elements;

        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            var imgUser = reader.result.split(",")[1] 
            setUpUser({
                idUser: parseInt(id),
                nameUser: nameUser.value, 
                passUser: passUser.value, 
                idUserType: currentUser.idUserType, 
                imgUser: imgUser, 
                statusUser: 1
            })

            socketS2.emit("updateUser", {
                idUser: parseInt(id),
                nameUser: nameUser.value, 
                passUser: passUser.value, 
                idUserType: currentUser.idUserType, 
                imgUser: imgUser, 
                statusUser: 1
            }); 
        });

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setUpUser({
                idUser: parseInt(id),
                nameUser: nameUser.value, 
                passUser: passUser.value, 
                idUserType: currentUser.idUserType, 
                imgUser: currentUser.imgUser,
                statusUser: 1
            })

            socketS2.emit("updateUser", {
                idUser: parseInt(id),
                nameUser: nameUser.value, 
                passUser: passUser.value, 
                idUserType: currentUser.idUserType, 
                imgUser: currentUser.imgUser,
                statusUser: 1
            }); 
        }
    }); 

    if (currentUser === null) {
        return <Redirect to="/"/>
    }

    if (currentUser.idUser !== parseInt(id)) {
        return <Redirect to="/"/>
    }

    const deleteUser = () => {
        socketS2.emit('deleteUser', id);
    }

    const renderDeleteButton =  () => {
        if (currentUser.idUserType === 3) {
            return (
                <button type="button" class="btn btn-outline-danger" style={{width: '200px', backgroundColor: '#EA3C53'}}
                onClick={ deleteUser }>
                <i class="fas fa-trash" style={{marginRight: '15px'}}></i>
                    Delete Account
                </button>
            )
        }
    }

    const renderToolbar = () => {
        if (currentUser.idUserType === 1) {
            return <ToolbarAdmin />
        }
        if (currentUser.idUserType === 2) {
            return <ToolbarStorer />
        }
        if (currentUser.idUserType === 3) {
            return <ToolbarClient />
        }
    }

    return (
        <div class="EditUser_body">
            { renderToolbar() }
            <br></br>
            <div className='jumbotron'>
                <form onSubmit={ handleSubmit }>
                    <fieldset>
                        <legend>Edit Account</legend>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" id="nameUser" name="nameUser" aria-describedby="nameUserHelp" placeholder="Username"
                            defaultValue={currentUser.nameUser} required/>
                            <small id="nameUserHelp" class="form-text text-muted">Put an easy to remember name</small>
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" id="passUser" name="passUser" aria-describedby="passUserHelp" placeholder="Password"
                            defaultValue={currentUser.passUser} required/>
                            <small id="passUserHelp" class="form-text text-muted">Set an easy to remember password</small>
                        </div>

                        <div className='form-group'>
                            <label>Profile Pic</label>
                            <img
                                src={`data:image/png;base64,${currentUser.imgUser}`}
                                height="400px"
                                alt={currentUser.imgUser}
                            />
                        </div>

                        <div class="form-group">
                            <label>Upload new profile pic</label>
                            <input type="file" class="form-control-file" id="imgInput" aria-describedby="imgHelp" name="imgInput"/>
                            <small id="imgHelp" class="form-text text-muted">Please use png images of 250x250 that do not exceed 20kb.</small>
                        </div>

                        <button type="submit" class="btn btn-primary" style={{width: '200px'}}>Submit</button>
                    </fieldset>
                </form><br></br>

                { renderDeleteButton() }
            </div>
        </div>
    );    
}

export default Settings;
