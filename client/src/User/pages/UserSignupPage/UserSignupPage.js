import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "../../../hooks/useForm";
import { createNewUser } from "../../UserActions";
import { selectUser } from "../../UserSelectors";

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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const requiredFields = ["username", "password", "passwordVerify"];

  const {
    onSubmit,
    hasError,
    isLoading,
    errorMessage,
    isFormDisabled,
    handleInputChange,
  } = useForm({
    handleSubmit: (formData) => {
      dispatch(createNewUser(formData));
    },
    validateForm: (formData) => {
      const { password, passwordVerify } = formData;
      if (password !== passwordVerify) return "Passwords do not match";
      if (password.length < 6)
        return "Password should be at least 6 characters"; // TODO: backend validation
      return true;
    },
    requiredFields,
  });

  return (
    <form
      disabled={isFormDisabled}
      onSubmit={onSubmit}
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
      <div className={`loader-button mt-4 ${isLoading ? "on" : ""}`}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isFormDisabled || isLoading}
        >
          Register
        </Button>
      </div>
      {hasError && <div className="mt-4 text-danger">{errorMessage}</div>}
      {!!user.error && <div className="mt-4 text-danger">{user.error}</div>}
      <div className="mt-4">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </form>
  );
};

export default UserSignupPage;
