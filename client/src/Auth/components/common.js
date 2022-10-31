import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export const nonEmpty = (input) => typeof input !== 'undefined' && input !== '';

export const hookStateToField = (state, setState) => {
    return (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };
}

export const Header = ({ classes, children }) => {
    return (
        <>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {children}
          </Typography>
        </>
    );
}

export const TextInput = ({ name, id, label, ...restProps }) => {
    return (
        <TextField
          name={name}
          variant="outlined"
          required
          fullWidth
          id={id}
          label={label}
          {...restProps}
        />
    );
};
