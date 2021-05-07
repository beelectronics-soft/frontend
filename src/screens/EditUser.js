import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ToolbarAdmin from '../components/ToolbarAdmin';
import './EditUser.css';

import io from "socket.io-client";
const socketS2 = io.connect("http://26.142.66.43:4001");

const EditUser = ({ history }) => {
    const { id } = useParams();
    const [ status, setStatus ] = useState(true);
    const [ user, setUser ] = useState({});

    if (status) {
        socketS2.emit('getUser', id);
        setStatus(false);
    }

    const deleteUser = () => {
        socketS2.emit('deleteUser', id);
    }

    useEffect(() => {
        socketS2.on('getUser', res => {
            setUser(JSON.parse(res));
        });

        socketS2.on('updateUser', res => {
            history.push('/admin');
        });

        socketS2.on('deleteUser', res => {
            history.push('/admin');
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
            const upUser = {
                idUser: parseInt(id),
                nameUser: nameUser.value, 
                passUser: passUser.value, 
                idUserType: 2, 
                imgUser: imgUser
            }

            socketS2.emit("updateUser", upUser); 
        });

        if (file) {
            reader.readAsDataURL(file);
        } else {
            const upUser = {
                idUser: parseInt(id),
                nameUser: nameUser.value, 
                passUser: passUser.value, 
                idUserType: 2, 
                imgUser: user.imgUser
            }

            socketS2.emit("updateUser", upUser); 
        }
    }); 

    return (
        <div class="EditUser_body">
            <ToolbarAdmin/><br></br>
            <div className='jumbotron'>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Edit User</legend>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" id="nameUser" name="nameUser" aria-describedby="nameUserHelp" placeholder="Username"
                            defaultValue={user.nameUser} required/>
                            <small id="nameUserHelp" class="form-text text-muted">Put an easy to remember name</small>
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" id="passUser" name="passUser" aria-describedby="passUserHelp" placeholder="Password"
                            defaultValue={user.passUser} required/>
                            <small id="passUserHelp" class="form-text text-muted">Set an easy to remember password</small>
                        </div>

                        <div className='form-group'>
                            <label>Profile Pic</label>
                            <img
                                src={`data:image/png;base64,${user.imgUser}`}
                                height="400px"
                                alt={user.imgUser}
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

                <button type="button" class="btn btn-outline-danger" style={{width: '200px', backgroundColor: '#EA3C53'}}
                onClick={deleteUser}>
                <i class="fas fa-trash" style={{marginRight: '15px'}}></i>
                    Fire Employee
                </button>
            </div>
        </div>
    );    
}

export default EditUser;