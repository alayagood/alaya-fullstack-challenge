import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { logout } from '../../Auth/authActions';

function Navbar() {
    const userData = useSelector((state) => state.auth.user);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    <RouterLink to="/" className="text-white">
                        Home
                    </RouterLink>
                </Typography>
                <div style={{ marginLeft: 'auto' }}>
                    {isLoggedIn && userData ? (
                        <div>
                            {userData && (
                                <Typography variant="subtitle1" className="text-white">
                                    Welcome, {userData.userName}
                                </Typography>
                            )}
                            <Button onClick={handleLogout} color="inherit">
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <RouterLink to="/login" className="text-white">
                                Login
                            </RouterLink>
                            <RouterLink to="/signup" className="text-white ml-2">
                                Sign Up
                            </RouterLink>
                        </div>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
