import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Box} from "@material-ui/core";
import useAuth from "../../hooks/useAuth";
import {useDispatch} from "react-redux";
import {logoutRequest} from "../../User/UserAction";
import {useHistory} from "react-router-dom";

function Navbar() {
    const isAuthenticated = useAuth();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSignInAndLogout = (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            handleLogout();
        } else {
            history.push('/sign-in');
        }
    };

    const handleLogout = () => {
        dispatch(logoutRequest());
        history.push('/');
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Box display='flex' flexGrow={1}>
                    <Typography variant="h6">
                        <Link href="/" className="text-white">Home</Link>
                    </Typography>
                </Box>
                <Typography variant="h6">
                    <Link href="#" onClick={handleSignInAndLogout}
                          className="text-white">{isAuthenticated ? 'Logout' : 'Sign in'}</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
