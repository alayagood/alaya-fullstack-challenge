import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginRequest } from '../../AuthActions';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const LoginPage = () => {

    const classes = useStyles();

    const [user, setUser] = useState({});

    const dispatch = useDispatch();

    const history = useHistory();

    const handleChange = (evt) => {
        const value = evt.target.value;
        setUser({
            ...user,
            [evt.target.name]: value
        });
    };

    const submit = () => {
        dispatch(loginRequest(user));
        history.push("/");
    }

    return (
        <div className="row">
            <div className="col-6">
                <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
                    <h3>Login</h3>
                    <TextField variant="filled" label="Email address" name="email" onChange={handleChange} />
                    <TextField variant="filled" label="Password" name="password" type={'password'} onChange={handleChange} />
                    <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!user.email || !user.password}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )

};

export default LoginPage;
