import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "../../../hooks/useForm";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const UserLoginPage = () => {
  const classes = useStyles();

  const requiredFields = ["username", "password"];

  const {
    handleInputChange,
    handleSubmit,
    isFormDisabled,
    hasError,
    errorMessage,
  } = useForm(function submitForm(formData) {
    console.log(formData);
  }, requiredFields);

  return (
    <form
      disabled={isFormDisabled}
      onSubmit={handleSubmit}
      className={`${classes.root} d-flex flex-column my-4 mx-auto`}
    >
      <h3>Login</h3>
      <TextField
        autoFocus
        variant="filled"
        label="Username"
        name="username"
        required
        onChange={handleInputChange}
      />
      <TextField
        type="password"
        variant="filled"
        label="Password"
        name="password"
        required
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        className="mt-4"
        variant="contained"
        color="primary"
        disabled={isFormDisabled}
      >
        Login
      </Button>
      {hasError && <div className="mt-4 text-danger">{errorMessage}</div>}
    </form>
  );
};

export default UserLoginPage;
