import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faHome, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import { logout } from '../../redux/actions/authActions';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function Navbar() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed">
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
                        <Button color="inherit" startIcon={<FontAwesomeIcon icon={faHome} />} href="/">Home</Button>
                    </Typography>
                    <Typography variant="h6">
                        {isAuthenticated ? (
                            <Button color="inherit" onClick={handleLogout}>
                                Logout <FontAwesomeIcon icon={faSignOutAlt} style={{ marginLeft: '0.5rem' }} />
                            </Button>
                        ) : (
                            <>
                                <Button color="inherit" startIcon={<FontAwesomeIcon icon={faSignInAlt} />} href="/login">Login</Button>
                                <Button color="inherit" startIcon={<FontAwesomeIcon icon={faUserPlus} />} href="/register">Register</Button>
                            </>
                        )}
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default Navbar;
