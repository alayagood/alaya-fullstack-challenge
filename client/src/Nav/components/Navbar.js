import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {AccountCircle} from "@mui/icons-material";
import {IconButton, Menu, MenuItem} from "@material-ui/core";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {resetToken} from "../../util/token";


const useStyles = makeStyles({
    // This group of buttons will be aligned to the right
    rightToolbar: {
        marginLeft: "auto",
        marginRight: -12
    },
    rightToolbarTitle: {
        color: "white",
        marginRight: 30,
        marginTop: 10,
        float: "left"
    },
    menuButton: {
        marginRight: 16,
        marginLeft: -12
    }
})

function Navbar() {

    const classes = useStyles();
    const isLoggedIn = useSelector(state => state.user.token);
    const username = useSelector(state => state.user.username);
    const [anchorEl, setAnchorEl] =  React.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseAndLogout = () => {
        handleClose();
        resetToken();
    };


    return (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" >
                <Link href="/" className="text-white">Home</Link>
            </Typography>
            <section className={classes.rightToolbar}>
                { isLoggedIn &&
                    <Typography variant="h6" className={classes.rightToolbarTitle}>
                        Hello, { username }
                    </Typography>
                }
                <IconButton
                    className={classes.menuButton}
                    size="medium"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                <AccountCircle style={{ color: 'white' }}/>
                </IconButton>
                {
                    !isLoggedIn &&
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >

                        <MenuItem
                            component={Link}
                            href="/users/login"
                            onClick={handleClose}>Login
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            href="/users/signup"
                            onClick={handleClose}>New user? Sign Up
                        </MenuItem>
                    </Menu>
                }
                {
                    isLoggedIn &&
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem
                            component={Link}
                            href="/"
                            onClick={handleCloseAndLogout}>Logout
                        </MenuItem>
                    </Menu>
                }
                </section>
        </Toolbar>
    </AppBar>
    );

};

export default Navbar;
