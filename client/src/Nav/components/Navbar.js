import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux';

function Navbar() {
    const loginState = useSelector(state => state.login);
    const loggedIn = loginState.jwt ?
        loginState.username
        : <div>
            <Typography>
                <Link href="/login" className="text-white">Login</Link>
            </Typography>
            <Typography>
                <Link href="/signup" className="text-white">Signup</Link>
            </Typography>
        </div>;

    return (
        <AppBar position="fixed">
            <Toolbar>
                <div className="col-11">
                    <Typography variant="h6" >
                        <Link href="/" className="text-white">Home</Link>
                    </Typography>
                </div>
                <div className="col-1">
                    {loggedIn}
                </div>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
