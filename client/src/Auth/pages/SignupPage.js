import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpRequest } from '../authActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from '../styles/formStyles';
import { Link, Redirect } from 'react-router-dom';
import { validateEmail, validatePassword } from '../helpers/formValidator';

const SignupPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { isLoggedIn, user: userData, error } = useSelector(state => state.auth);

    const handleSignUp = () => {
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 6 characters.');
            return;
        }
        setEmailError('');
        setPasswordError('');
        const formData = { userName, email, password };
        dispatch(signUpRequest(formData));
        if (userData) {
            setUserName('');
            setEmail('');
            setPassword('');
        }
    };

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div className={classes.root}>
            <form className={classes.form}>
                <h2>Sign Up</h2>
                {userData && (
                    <p>Success! You can now <Link to="/login">Login</Link></p>
                )}
                {error && (
                    <p style={{ color: 'red' }}>{error}</p>
                )}
                <TextField
                    label="User Name"
                    variant="outlined"
                    inputProps={{"data-testid": "userName", maxLength:12 }}
                    fullWidth
                    className={classes.textField}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    inputProps={{"data-testid": "email", maxLength:40 }}
                    fullWidth
                    className={classes.textField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!emailError}
                    helperText={emailError}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    inputProps={{"data-testid": "password", maxLength:40 }}
                    fullWidth
                    type="password"
                    className={classes.textField}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!passwordError}
                    helperText={passwordError}
                />
                <Button
                    variant="contained"
                    fullWidth
                    className={classes.submitButton}
                    onClick={handleSignUp}
                    disabled={!userName || !email || !password}
                >
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default SignupPage;
