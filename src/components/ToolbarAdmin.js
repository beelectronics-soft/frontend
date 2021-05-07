import React from "react";
import { Link } from 'react-router-dom';

import { getAuthContext } from '../utils/AuthContext';

function ToolbarAdmin() {
    const { currentUser, setCurrentUser } = getAuthContext();

    // ban session
    const closeSession = () => {
        setCurrentUser(null);
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link class="navbar-brand" to="/admin">Beelectronics</Link>
                <div class="collapse navbar-collapse" id="navbarColor02">
                    <ul class="navbar-nav mr-auto">
                    <Link to={`/settings/${currentUser.idUser}`} style={{ marginRight: '10px' }}>My Account</Link>
                    </ul>
                    <Link to="/add/user"> 
                        <button align = "right" type="button" class="btn btn-primary" >
                            <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-plus" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"></path>
                                <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"></path>                  
                            </svg>
                                Add user
                        </button> 
                    </Link>
                    <Link to="/" style={{ marginRight: '10px', color: '#EA3C53', marginLeft: "15px" }}
                    onClick={ closeSession } >
                        Sign Out
                    </Link>                    
                </div>
            </nav>
        </div>
    );
}

export default ToolbarAdmin;