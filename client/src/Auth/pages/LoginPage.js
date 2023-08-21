import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { loginRequest } from '../authActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from '../styles/formStyles';
import {Redirect} from "react-router-dom"; // Update the path if needed

const LoginPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userInformation = useSelector((state) => state.auth.user);

    if (userInformation) {
        return <Redirect to="/" />;
    }
    const handleLogin = () => {
        const userData = { email, password };
        dispatch(loginRequest(userData));
    };

    return (
        <div className={classes.root}>
            <form className={classes.form}>
                <h2>Log in</h2>
                <TextField
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    className={classes.textField}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    fullWidth
                    className={classes.submitButton}
                    onClick={handleLogin}
                >
                    Sign In
                </Button>
            </form>
        </div>
    );
};

export default LoginPage;
