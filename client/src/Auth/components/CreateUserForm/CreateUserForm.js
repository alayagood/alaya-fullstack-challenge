import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";

import { useCreateUserForm } from "./useCreateUserForm";

const styles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export const CreateUserForm = ({onSubmit, error, success}) => {
    const {validForm, submit, handleChange} = useCreateUserForm({onSubmit})
    const classes = styles();

    return (
        <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
            <h3>Sign up</h3>
            {Boolean(error) && <span style={{color: 'red'}}>{error}</span>}
            {success && <span style={{color: 'green'}}>User created!</span>}
            <TextField test-id={'name'} variant="filled" label="Name" name="name" onChange={handleChange}/>
            <TextField variant="filled" label="Email" name="email" onChange={handleChange}/>
            <TextField type={'password'} variant="filled" label="password" name="password" onChange={handleChange}/>
            <Button role={'button'} className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!validForm}>
                Submit
            </Button>
        </div>
    );
};

CreateUserForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    success: PropTypes.bool
};
