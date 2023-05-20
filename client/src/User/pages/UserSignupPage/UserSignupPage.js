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

const UserSignupPage = () => {
  const classes = useStyles();

  const requiredFields = ["username", "password", "passwordVerify"];

  const {
    handleInputChange,
    handleSubmit,
    isFormDisabled,
    hasError,
    errorMessage,
  } = useForm(
    function submitForm(formData) {
      console.log(formData);
    },
    requiredFields,
    function validateForm(formData) {
      const { password, passwordVerify } = formData;
      if (password !== passwordVerify) return "Passwords do not match";
      if (password.length < 6)
        return "Password should be at least 6 characters"; // TODO: backend validation
      return true;
    }
  );

  return (
    <form
      disabled={isFormDisabled}
      onSubmit={handleSubmit}
      className={`${classes.root} d-flex flex-column my-4 mx-auto`}
    >
      <h3>Sign up</h3>
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
      <TextField
        type="password"
        variant="filled"
        label="Password (again)"
        name="passwordVerify"
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

export default UserSignupPage;
