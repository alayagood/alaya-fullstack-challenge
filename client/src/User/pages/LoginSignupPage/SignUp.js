import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { TextField, Button, CircularProgress, Link, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { signUp } from "../../UserActions";

// Import Style
const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const SignUp = () => {
    const classes = useStyles();
    const [state, setState] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
      };

    const { loading, error, userToken } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if (userToken) {
          history.push("/");
        }
    }, [history, userToken]);

    const submit = async (e) => {
        e.preventDefault();
        if (state.username && state.email && state.password) {
            dispatch(signUp(state));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className={`${classes.root} d-flex flex-column my-4 w-100 col-6`}>
                    <h1>Create an account</h1>
                    {loading && <CircularProgress />}
                    <TextField variant="filled" label="Name" name="username" onChange={handleChange} />
                    <TextField variant="filled" label="E-mail" name="email" onChange={handleChange} />
                    <TextField variant="filled" label="Password" name="password" type="password" onChange={handleChange} />
                    <Button className="mt-4" variant="contained"
                        color="primary" onClick={(e) => submit(e)}
                        disabled={loading}
                    >
                        Create
                    </Button>
                    { error && <Typography  variant="subtitle1" color="error">
                        Sign up failed. Please try again.
                    </Typography>}
                    <Link href="/login">Already a user? Click here to login.</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;