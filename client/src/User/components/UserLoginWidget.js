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

const UserLoginWidget = ({ login }) => {
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
        <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
            <h3>User login</h3>
            <TextField variant="filled" label="Username" name="username" onChange={handleChange} />
            <TextField variant="filled" label="Password" name="password" onChange={handleChange} type={"password"} />
            <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.username || !state.password}>
                Login
            </Button>
        </div>
    );
};

UserLoginWidget.propTypes = {
    login: PropTypes.func.isRequired
};

export default UserLoginWidget;