import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { TextField, Link } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
// Import Components
// Import Actions
import Logo from '../../logo.svg';
// Import Style
const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 500
    },
    formContainer: {
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

const AuthSignUpWidget = ({ signup, error }) => {
    const [state, setState] = useState({ hasSubmited: false });
    const classes = useStyles();

    const submit = () => {
        setState({ ...state, hasSubmited: true });

        if (state.password !== state.retryPassword) {
            return;
        }

        if (state.username && state.password) {
            signup(state);
        }
    };

    const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            hasSubmited: false,
            [evt.target.name]: value
        });
    };

    return (
        <div className={`${classes.root} container`}>
            <div className='row'>
                <div className="d-flex align-items-center">
                    <img src={Logo} alt="Logo" style={{ height: '72px' }} />
                    <h1 className="mt-1 ml-4">
                        Create a new account
                    </h1>
                </div>
            </div>
            <div className='row'>
                <div className={`d-flex flex-column w-100 ${classes.formContainer}`}>
                    <TextField variant="filled" label="Firstname" name="firstname" onChange={handleChange} />
                    <TextField variant="filled" label="Lastname" name="lastname" onChange={handleChange} />
                    <TextField variant="filled" label="Username" name="username" onChange={handleChange} />
                    <TextField variant="filled" label="Password" name="password" type="password" onChange={handleChange} />
                    <TextField variant="filled" label="Retry password" name="retryPassword" type="password" onChange={handleChange} />
                    {state.hasSubmited && state.password !== state.retryPassword && <span className='text-danger'>Password do not match</span>}
                    {state.hasSubmited && error && <span className='text-danger'>{error}</span>}
                    <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.firstname || !state.lastname || !state.username || !state.password || !state.retryPassword}>
                        Sign Up
                    </Button>
                    <span>You already have an account? <Link href="/signin" className="text-primary">Sing in here</Link> </span>
                </div>
            </div>

        </div>
    );
};

AuthSignUpWidget.propTypes = {
    signup: PropTypes.func.isRequired
};

export default AuthSignUpWidget;
