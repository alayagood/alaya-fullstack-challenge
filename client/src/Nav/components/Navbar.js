import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function Navbar() {
    const isAuthenticated = useSelector((state) => state.auth.token);

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" >
                    { isAuthenticated
                        ? <Link to="/posts" className="text-white">Home</Link>
                        : <Link to="/login" className="text-white">Login</Link>
                    }
                </Typography>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
