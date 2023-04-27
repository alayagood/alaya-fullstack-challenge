import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useDispatch } from 'react-redux';
import { logout } from '../../Auth/AuthActions';
import { useHistory } from 'react-router-dom';
import Logo from '../../logo.svg';
import { makeStyles } from '@material-ui/core/styles';

// Import Style
const useStyles = makeStyles(theme => ({
    navLink: {
        cursor: 'pointer'
    },
}));

function Navbar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const goHome = () => {
        history.push('/posts');
    }

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <AppBar position="fixed">
            <Toolbar className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px' }} />
                    <Typography variant="h5" >
                        <Link onClick={goHome} className={`${classes.navLink} text-white`}>Alaya Blog</Link>
                    </Typography>
                </div>
                <Typography variant="h6" >
                    <Link onClick={handleLogout} className={`${classes.navLink} text-white`}>Logout</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
