import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux';

function Navbar() {
    const user = useSelector(state => state.user.data);

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" >
                    <Link href="/" className="text-white p-2">Home</Link>
                    {
                        !user.token ? <>
                            <Link href="/signup" className="text-white p-2">Signup</Link>
                            <Link href="/login" className="text-white p-2">Login</Link>
                        </> : <></>
                    }
                    
                </Typography>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
