import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Navbar({ isLoggedIn }) {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" >
                    <Link href="/" className="text-white mr-4">Home</Link>
                    <Link href="/auth" className="text-white">{isLoggedIn ? "Logout" : "Login / Register"}</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
