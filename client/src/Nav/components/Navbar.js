import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { getAuthenticated, getUser } from "@/Auth/Reducer";
import { logout } from "@/Auth/Actions";

function Navbar() {
    const dispatch = useDispatch(),
        isAuthenticated = useSelector(getAuthenticated),
        user = useSelector(getUser),
        onLogout = () => {
            dispatch(logout());
        };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" className={"flex-grow-1"}>
                    <Link href="/" className="text-white">Home</Link>
                </Typography>
                {isAuthenticated
                    ? <>
                        <Typography variant="h6">
                            Hi {user.firstName}!
                        </Typography>
                        <Button className={"ml-3"} color="inherit" onClick={onLogout}>Logout</Button>
                    </>
                    : <>
                        <Button color="inherit" href="/login">Login</Button>
                        <Button color="inherit" href="/register">Register</Button>
                    </>
                }
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
