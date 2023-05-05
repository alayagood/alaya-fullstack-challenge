import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import apiCaller from "../../util/apiCaller";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const history = useHistory();
  const [submitError, setSubmitError] = useState("");
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

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({isSubmitting}) => (
        <Form>
          <div className="form-group">
            <label htmlFor="author-input">Author Name</label>
            <Field
              type="text"
              className="form-control"
              id="name-input"
              name="name"
              placeholder="Enter author name"
            />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>
          <div className="form-group">
            <label htmlFor="email-input">Email address</label>
            <Field
              type="email"
              className="form-control"
              id="email-input"
              name="email"
              placeholder="Enter email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password-input">Password</label>
            <Field
              type="password"
              className="form-control"
              id="password-input"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeat-password-input">Repeat Password</label>
            <Field
              type="password"
              className="form-control"
              id="repeat-password-input"
              name="repeatPassword"
              placeholder="Repeat Password"
            />
            <ErrorMessage
              name="repeatPassword"
              component="div"
              className="text-danger"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
          {submitError && <div className="text-danger">{submitError}</div>}
        </Form>
      )}
    </Formik>
  );
}

export default Signup;
