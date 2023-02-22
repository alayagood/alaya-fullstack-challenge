import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory, useLocation} from "react-router-dom";
import {loginRequest, signupRequest} from "../../AuthActions";
import {makeStyles} from "@material-ui/core/styles";

import {AppPaths} from "../../../App";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const AuthPage = () => {
    const [state, setState] = useState({});
    const [error, setError] = useState();


    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();


    const isValid = state.email && state.password;
    const isSignup = location.pathname === AppPaths.SIGNUP;

    const submit = async () => {
        if (!isValid) {
            setError("All fields are required");
        }
        if (isSignup) {
            dispatch(signupRequest(state));
        } else {
            dispatch(loginRequest(state));
        }
        // TODO - handle errors
        history.push('/')

    };

    const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const SwitchViewText = () => {
        if (isSignup) {
            return <p>I already have an account! <Link to={AppPaths.LOGIN}>Login</Link></p>
        }
        return <p>Don't have an account yet? <Link to={AppPaths.SIGNUP}>Sign up now!</Link></p>

    }

    return <div className="container">
        <div className="row justify-content-center">
            <div className="col-6">
                <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
                    <h3>{isSignup ? 'Signup' : 'Login'}</h3>
                    <TextField variant="filled" label="Email" name="email" onChange={handleChange}/>
                    <TextField variant="filled" type="password" label="Password" name="password"
                               onChange={handleChange}/>
                    <SwitchViewText/>
                    <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()}
                            disabled={!isValid}>
                        Submit
                    </Button>
                    {/*    Todo - show error*/}

                </div>
            </div>
        </div>
    </div>
}

export default AuthPage;

