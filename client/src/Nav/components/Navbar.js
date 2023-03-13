import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Navbar() {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" >
                    <Link href="/" className="text-white mr-4">Home</Link>
                    <Link href="/register" className="text-white">Register</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
