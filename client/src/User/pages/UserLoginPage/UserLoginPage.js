import React, { useCallback, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

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
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState(null);

  const requiredFields = ["username", "password"];

  const handleChange = (evt) => {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: value,
    });
  };

  const isFormDisabled = requiredFields.reduce((hasAllValues, key) => {
    const hasValue = !!formValues?.[key]?.length;
    return hasAllValues && hasValue;
  }, true);

  const handleSubmit = useCallback(() => {
    if (isFormDisabled) return;
    console.log(formValues);
  }, [formValues, isFormDisabled]);

  const handleError = (err) => {
    setError(err);
  };

  return (
    <form
      disabled={isFormDisabled}
      onSubmit={handleSubmit}
      className={`${classes.root} d-flex flex-column my-4 mx-auto`}
    >
      <h3>Login</h3>
      <TextField
        variant="filled"
        label="Username"
        name="username"
        onChange={handleChange}
      />
      <TextField
        type="password"
        variant="filled"
        label="Password"
        name="password"
        onChange={handleChange}
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
      {!!error && <div className="mt-4 text-danger">{error}</div>}
    </form>
  );
};

export default UserLoginPage;
