import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    linkMargin: {
        marginRight: '10px',
    },
});

function Navbar() {
    const isAuthenticated = useSelector((state) => state.auth.token);
    const classes = useStyles();

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" >
                    { isAuthenticated
                        ? <Link to="/posts" className="text-white">Home</Link>
                        :   <>
                                <Link to="/login" className={`${classes.linkMargin} text-white`}>Login</Link>
                                <Link to="/register" className="text-white">Create new account</Link>
                            </>
                    }
                </Typography>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
