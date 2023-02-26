import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { registerRequest } from '../../AuthActions';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const RegisterPage = () => {

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
        dispatch(registerRequest(user));
        history.push("/");
    }

    return (
        <div className="row">
            <div className="col-6">
                <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
                    <h3>Register new user</h3>
                    <TextField variant="filled" label="Name" name="name" onChange={handleChange} />
                    <TextField variant="filled" label="Email address" name="email" onChange={handleChange} />
                    <TextField variant="filled" label="Password" name="password" type={'password'} onChange={handleChange} />
                    <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!user.name || !user.email || !user.password}>
                        Register
                    </Button>
                </div>
            </div>
        </div>
    )

};

export default RegisterPage;
