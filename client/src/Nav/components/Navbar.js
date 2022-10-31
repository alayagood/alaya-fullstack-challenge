import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux';
import { isSignedIn } from '../../Auth/AuthReducer';

const SignInLink = () => <Link href="/signin" className="text-white">Sign In</Link>;
const SignOutLink = () => <Link href="/signout" className="text-white">Sign Out</Link>;

const AuthLink = () => {
    const isAuthenticated = useSelector(isSignedIn);

    return isAuthenticated ? <SignOutLink /> : <SignInLink />;
}

function Navbar() {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography component="div" variant="h6" style={{ flexGrow: 1 }}>
                    <Link href="/" className="text-white">Home</Link>
                </Typography>
                <AuthLink />
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
