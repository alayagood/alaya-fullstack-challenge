import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Auth/AuthActions';

function Navbar() {

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    return (
        <AppBar position="fixed">
            <Typography variant="h6">
                <Toolbar>
                    <Link href="/" className="text-white mr-auto">Home</Link>
                    {user === null ? (
                        <div className="row">
                            <Link href="/login" className="text-white mx-3">Log in</Link>
                            <Link href="/register" className="text-white ml-3">Register</Link>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="text-white mx-3 font-weight-bold">
                                Hello, {user.name}!
                            </div>
                            <Link component="button" className="text-white ml-3" onClick={() => dispatch(logout())}>Logout</Link>
                        </div>
                    )
                    }
                </Toolbar>
            </Typography>
        </AppBar >
    );

};

export default Navbar;
