import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { signUp } from '../UserActions';


const SignupPage = () => {
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

    const formIsValid = () => {
        if (!state.name || !state.name.length) {
            setState({
                ...state,
                nameErrorEnabled: true
            });

            return false;
        }

        if (!state.password || !state.password.length) {
            setState({
                ...state,
                passwordErrorEnabled: true
            });

            return false;
        }

        if (!state.passwordValidation || state.passwordValidation !== state.password) {
            setState({
                ...state,
                passwordValidationErrorEnabled: true
            });

            return false;
        }

        return true;
    }

    const signUpHandler = async () => {
        if (formIsValid()) {
            try {
                await dispatch(signUp({
                    name: state.name,
                    password: state.password
                }));
                history.push('/');
            } catch (error) {
                console.error('Something went wrong during singup')
            }
        }
    }

    return <>
        <section className="container">
            <div className="row">
            <h3>Sign up new user</h3>
                <div className="d-flex flex-column my-4 w-100">
                    <TextField className="mt-3" variant="filled" label="Name" name="name" type="name" error={state.nameErrorEnabled} onChange={handleChange} />
                    <TextField className="mt-3" variant="filled" label="Password" name="password" type="password" error={state.passwordErrorEnabled} onChange={handleChange} />
                    <TextField className="mt-3" variant="filled" label="Repeat your password" name="passwordValidation" type="password" error={state.passwordValidationErrorEnabled} onChange={handleChange} />
                    <Button className="mt-4" variant="contained" color="primary" onClick={() => signUpHandler()} disabled={!state.name || !state.password || !state.passwordValidation}>
                        Signup
                    </Button>
                </div>
            </div>
        </section>
        
    </>
}

export default SignupPage;