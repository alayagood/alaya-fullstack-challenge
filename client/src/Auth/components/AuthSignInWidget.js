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

const AuthSignInWidget = ({ login, error }) => {
    const [state, setState] = useState({});
    const classes = useStyles();

    const submit = () => {
        if (state.username && state.password) {
            login(state);
        }
    };

    const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    return (
        <div className={`${classes.root} container`}>
            <div className='row'>
                <div className="d-flex align-items-center">
                    <img src={Logo} alt="Logo" style={{ height: '72px' }} />
                    <h1 className="mt-1 ml-4">
                        Sign In
                    </h1>
                </div>
            </div>
            <div className='row'>
                <div className={`d-flex flex-column w-100 ${classes.formContainer}`}>
                    <TextField variant="filled" label="Username" name="username" onChange={handleChange} />
                    <TextField variant="filled" label="Password" name="password" type="password" onChange={handleChange} />
                    <span className='text-danger'>{error}&nbsp;</span>
                    <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.username || !state.password}>
                        Sign In
                    </Button>
                    <span>You don't have an account? <Link href="/signup" className="text-primary">Sing up now</Link> </span>
                </div>
            </div>

        </div>
    );
};

AuthSignInWidget.propTypes = {
    login: PropTypes.func.isRequired
};

export default AuthSignInWidget;
