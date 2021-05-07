import React, { useCallback, useEffect } from 'react';
import ToolbarAdmin from '../components/ToolbarAdmin';
import './AddUser.css';

import io from "socket.io-client";
const socketS2 = io.connect("http://26.142.66.43:4001");

const AddUser = ({ history }) => {

    useEffect(() => {
        socketS2.on('addUser', res => {
            if (res === true) {
                history.push('/admin');
            } else {
                alert(res);
            }
        });
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const { nameUser, passUser } = e.target.elements;

        const user = {
            nameUser: nameUser.value, 
            passUser: passUser.value, 
            idUserType: 2, 
            imgUser: null
        }

        socketS2.emit("addUser", user); 
    }); 

    return (
        <div class="AddUser_body">
        <ToolbarAdmin/><br></br>
        <div className='jumbotron'>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Add User</legend>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" id="nameUser" name="nameUser" aria-describedby="nameUserHelp" placeholder="Username"
                        required />
                        <small id="nameUserHelp" class="form-text text-muted">Put an easy to remember name</small>
                    </div>
        
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" id="passUser" name="passUser" aria-describedby="passUserHelp" placeholder="Password"
                        required/>
                        <small id="passUserHelp" class="form-text text-muted">Set an easy to remember password</small>
                    </div>

                    <button type="submit" class="btn btn-primary" style={{width: '200px'}}>Submit</button>
                </fieldset>
            </form><br></br>
            </div>
        </div>
    );    
}

export default AddUser;