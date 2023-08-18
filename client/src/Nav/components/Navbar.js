import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { appBarStyles, logoStyles } from './Navbar.styles';
import { logOut } from '../../Auth/AuthActions';

const Navbar = () => {
    const dispatch = useDispatch();
    const authData = useSelector(state => state.auth.user);

    const logOutUser = () => {
        dispatch(logOut());
    }

    return (
        <AppBar position="fixed" sx={appBarStyles}>
            <Toolbar>
                <Typography variant="h6" sx={logoStyles}>
                    MERN blog
                </Typography>
                <Button href="/" className="text-white">Posts</Button>
                { !authData
                    ? <Button href="/sign-in" className="text-white">Sign in</Button>
                    : <Button onClick={logOutUser} className="text-white">Log out</Button>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

