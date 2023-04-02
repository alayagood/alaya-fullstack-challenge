import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import {makeStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {useLoginForm} from "./useLoginForm";


const styles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export const LoginForm = ({onSubmit, error}) => {
    const {handleChange, submit, validForm} = useLoginForm({onSubmit})
    const classes = styles();

    return (
        <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
            <h3>Login</h3>
            {Boolean(error) && <span style={{color: 'red'}}>{error}</span>}
            <TextField variant="filled" label="Email" name="email" onChange={handleChange}/>
            <TextField type={'password'} variant="filled" label="Password" name="password" onChange={handleChange}/>
            <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!validForm}>
                Submit
            </Button>
        </div>
    );
};

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
}
