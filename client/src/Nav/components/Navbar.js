import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';

function Navbar({ isLoggedIn }) {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" >
                    <NavLink to="/" className="text-white mr-4">Home</NavLink>
                    { isLoggedIn ?
                        <NavLink to="/logout" className="text-white">Logout</NavLink> :
                        <NavLink to="/auth" className="text-white">Login / Register</NavLink>
                    }
                </Typography>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
