import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { loginRequest } from '../authActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from '../styles/formStyles';
import {Redirect} from "react-router-dom";

const LoginPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const error = useSelector((state) => state.auth.error);

    const isButtonDisabled = !email || !password;

    if (isLoggedIn) {
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
                {error && (
                    <p style={{ color: 'red' }}>{error}</p>
                )}
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
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    fullWidth
                    className={classes.submitButton}
                    onClick={handleLogin}
                    disabled={isButtonDisabled}
                >
                    Login
                </Button>
            </form>
        </div>
    );
};
export default LoginPage;
