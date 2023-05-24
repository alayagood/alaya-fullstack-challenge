import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Navbar() {
    const [token,setToken] = useState(localStorage.getItem('token'));

    const logout = () => {

        localStorage.removeItem('token');
        setToken(localStorage.getItem('token'));
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" >
                    <Link id="Home" href="/" className="text-white">Home</Link>
                </Typography>
                <Typography variant="h6">
                    <Link id="Login" href="/auth" className="text-white">Login</Link>
                    <button onClick={logout}> Logout </button>
                </Typography>
            
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
