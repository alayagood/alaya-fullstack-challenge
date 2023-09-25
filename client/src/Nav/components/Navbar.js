import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { logoutRequest } from '../../User/UserActions';

function Navbar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const isAuthenticated = useSelector(state => state.user?.isAuthenticated);
    const login = () => history.push('/access');
    const logout = () => dispatch(logoutRequest())

    console.log()
    return (
        <AppBar position="fixed">
            <Toolbar className='justify-content-between'>
                <Typography variant="h6" >
                    <Link href="/" className="text-white">Home</Link>
                </Typography>
                {history.location.pathname !== '/access' && <Typography variant="h6" >
                    <Button
                        onClick={isAuthenticated ? logout : login}
                        className="text-white">
                        {isAuthenticated ? "Logout" : "Login"}
                    </Button>
                </Typography>}
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
