import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux';

function Navbar() {
    const isAuthenticated = useSelector((state) => state.user);

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" >
                    { isAuthenticated
                        ? <Link href="/" className="text-white">Home</Link>
                        : <Link href="/login" className="text-white">Login</Link>
                    }
                </Typography>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
