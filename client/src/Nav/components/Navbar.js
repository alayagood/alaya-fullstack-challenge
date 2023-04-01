import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';

function Navbar() {
    const user = useSelector((state) => state.auth?.user);

    return (
        <AppBar position="static">
            <Toolbar>
                <Box display='flex' flexGrow={1}>
                    <Link href="/" className="text-white">Home</Link>
                </Box>
                <Link href="/logout" className="text-white">{user}</Link>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
