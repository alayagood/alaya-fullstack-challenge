import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logoutRequest} from "../../Auth/AuthActions";
import {getUserId} from "../../Auth/AuthReducer";

function Navbar() {

    const userId = useSelector(getUserId, undefined);
    const dispatch = useDispatch();

    const logout = () => {
        return dispatch(logoutRequest());
    }
    const AuthButton = () => {
        if (!userId) {
            return <Button color="inherit"><Link to="/login" className="text-white">{'Login'}</Link></Button>
        }
        return <Button color="inherit" onClick={logout}><Link to="/login" className="text-white">{'Logout'}</Link></Button>
    }
    return (
        <AppBar position="fixed">
            {/*Documentation from https://v4.mui.com/ combined with bootstrap classes*/}
            <Toolbar className="text-white d-flex">
                <Typography variant="h6" className="flex-grow-1">
                    <Link to="/" className="text-white">Home</Link>
                </Typography>
                <AuthButton/>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
