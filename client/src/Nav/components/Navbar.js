import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useDispatch } from 'react-redux';
import { logout } from '../../Auth/AuthActions';
import { useHistory } from 'react-router-dom';

function Navbar() {
    const dispatch = useDispatch();
    const history = useHistory();

    const goHome = () => {
        history.push('/posts');
    }

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <AppBar position="fixed">
            <Toolbar className="d-flex justify-content-between">
                <Typography variant="h6" >
                    <Link onClick={goHome} className="text-white">Home</Link>
                </Typography>
                <Typography variant="h6" >
                    <Link onClick={handleLogout} className="text-white">Logout</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
