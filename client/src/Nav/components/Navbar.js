import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../User/UserActions';
import { getUserToken } from "../../User/UserReducer";

const Navbar = () => {
    const dispatch = useDispatch();

    const userToken = useSelector(getUserToken);
    const logout = () => {
        dispatch(logOut());
    }
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" >
                    <Link href="/" className="text-white">Home</Link>
                </Typography>
                <Box flexGrow={1} />
                {userToken && <Typography variant="h6" >
                    <Link href="/login" className="text-white right" onClick={() => logout()}>Logout</Link>
                </Typography>}
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
