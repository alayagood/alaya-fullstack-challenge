import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import apiCaller from "../../util/apiCaller";
import {useFormik} from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

function Signup() {
  const history = useHistory();
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = (values, {setSubmitting}) => {
    apiCaller("signup", "post", values)
      .then(() =>
        apiCaller("login", "post", {
          email: values.email,
          password: values.password,
        })
      )
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setSubmitError(err.json.message);
        setSubmitting(false);
      });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <TextField
          fullWidth
          id="name-input"
          name="name"
          label="Author Name"
          variant="outlined"
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          type="text"
        />
      </div>
      <div className="form-group">
        <TextField
          fullWidth
          id="email-input"
          name="email"
          variant="outlined"
          margin="normal"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          type="email"
        />
      </div>
      <div className="form-group">
        <TextField
          fullWidth
          id="password-input"
          name="password"
          variant="outlined"
          margin="normal"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          type="password"
        />
      </div>
      <div className="form-group">
        <TextField
          fullWidth
          id="repeat-password-input"
          name="repeatPassword"
          variant="outlined"
          margin="normal"
          label="Repeat password"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.repeatPassword &&
            Boolean(formik.errors.repeatPassword)
          }
          helperText={
            formik.touched.repeatPassword && formik.errors.repeatPassword
          }
          type="password"
        />
      </div>
      <div className="text-center">
        {submitError && <div className="text-danger mb-3">{submitError}</div>}
        <Button
          type="submit"
          variant="contained"
          className="btn btn-primary"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Submitting..." : "Sign Up"}
        </Button>
      </div>
    </form>
  );
}

export default Signup;
