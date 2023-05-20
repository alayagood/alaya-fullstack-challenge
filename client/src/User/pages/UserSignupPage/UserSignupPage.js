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
    handleInputChange,
    handleSubmit,
    isFormDisabled,
    hasError,
    errorMessage,
  } = useForm(
    function submitForm(formData) {
      dispatch(createNewUser(formData));
    },
    requiredFields,
    function validateForm(formData) {
      const { password, passwordVerify } = formData;
      if (password !== passwordVerify) return "Passwords do not match";
      if (password.length < 4)
        return "Password should be at least 6 characters"; // TODO: backend validation
      return true;
    },
    {
      username: "test",
      password: "test",
      passwordVerify: "test",
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
        defaultValue="test"
        autoFocus
        variant="filled"
        label="Username"
        name="username"
        required
        onChange={handleInputChange}
      />
      <TextField
        defaultValue="test"
        type="password"
        variant="filled"
        label="Password"
        name="password"
        required
        onChange={handleInputChange}
      />
      <TextField
        defaultValue="test"
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
        Register
      </Button>
      {hasError && <div className="mt-4 text-danger">{errorMessage}</div>}
      {!!user.error && <div className="mt-4 text-danger">{user.error}</div>}
      <div className="mt-4">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </form>
  );
};

export default UserSignupPage;
