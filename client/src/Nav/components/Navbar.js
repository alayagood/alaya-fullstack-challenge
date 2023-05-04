import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Auth/AuthActions';
import { useHistory } from 'react-router-dom';

function Navbar() {
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = (evt) => {
        dispatch(logout());
        history.push('/');
        evt.preventDefault();
    };

    return (
        <AppBar position="fixed">
            <Toolbar className="d-flex justify-content-between">
                <Typography variant="h6" >
                    <Link href="/" className="text-white">Home</Link>
                </Typography>
                {!token ? <Typography variant="h6" >
                    <Link href="/login" className="text-white">Log in</Link>
                </Typography>
                :
                <Typography variant="h6" >
                    <Link href="/" onClick={handleLogout} className="text-white">Logout</Link>
                </Typography>
                }
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
