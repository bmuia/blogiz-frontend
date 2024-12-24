import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeAuthToken } from '../../configs/authConfig';

function Logout() {
    const navigate = useNavigate();  

    const handleLogout = () => {
        removeAuthToken();
        
        navigate('/'); 
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
