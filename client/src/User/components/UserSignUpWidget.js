import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

// Import Style

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const UserSignUpWidget = ({ signUp }) => {
    const [state, setState] = useState({});
    const classes = useStyles();

    const submit = () => {
        if (state.username && state.password && state.repeatpassword && state.password === state.repeatpassword) {
            signUp(state);
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
        <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
            <h3>User sign up</h3>
            <TextField variant="filled" label="Username" name="username" onChange={handleChange} />
            <TextField variant="filled" label="Password" name="password" onChange={handleChange} type={"password"} />
            <TextField variant="filled" label="Repeat password" name="repeatpassword" onChange={handleChange} error={state.password !== state.repeatpassword}  type={"password"} />
            <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.username || !state.password || !state.repeatpassword}>
                Sign Up
            </Button>
        </div>
    );
};

UserSignUpWidget.propTypes = {
    signUp: PropTypes.func.isRequired
};

export default UserSignUpWidget;