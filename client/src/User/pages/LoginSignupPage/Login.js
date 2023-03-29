import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { TextField, CircularProgress, Button, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { logIn } from "../../UserActions";
// Import Style

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const Login = () => {
    const [state, setState] = useState({});
    const classes = useStyles();
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
        if (state.email && state.password) {
            dispatch(logIn(state));
        }
    }

    return (
        <div className="container">
            <div className="row">
                {loading && <CircularProgress />}
                <div className={`${classes.root} d-flex flex-column my-4 w-100 col-6`}>
                    <TextField variant="filled" label="E-mail" name="email" onChange={handleChange} />
                    <TextField variant="filled" label="Password" name="password" type="password" onChange={handleChange} />
                    <Button className="mt-4" variant="contained" color="primary" onClick={submit}>Log In</Button>
                    { error && <Typography  variant="subtitle1" color="error">
                        Login failed. Please try again.
                    </Typography>}
                    <Link to="/signup">New User? Sign up here.</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;