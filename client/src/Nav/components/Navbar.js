import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" >
                    <Link to="/" className="text-white">Home</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
