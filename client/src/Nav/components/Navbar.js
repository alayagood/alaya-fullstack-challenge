import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { logout } from '../../actions/authActions';

function Navbar() {
    const user = useSelector((state) => state.auth?.user);
    const dispatch = useDispatch();

    const doLogout = () => {
        dispatch(logout());
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box display='flex' flexGrow={1}>
                    <Link href="/" className="text-white">Home</Link>
                </Box>
                <Link href="/" className="text-white" onClick={() => doLogout()}>{user}</Link>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
