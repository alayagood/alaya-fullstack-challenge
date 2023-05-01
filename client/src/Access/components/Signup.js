import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const validationSchema = Yup.object().shape({
    author: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{
        author: "",
        email: "",
        password: "",
        repeatPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({isSubmitting}) => (
        <Form>
          <div className="form-group">
            <label htmlFor="author-input">Author Name</label>
            <Field
              type="text"
              className="form-control"
              id="author-input"
              name="author"
              placeholder="Enter author name"
            />
            <ErrorMessage
              name="author"
              component="div"
              className="text-danger"
            />
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
        </Form>
      )}
    </Formik>
  );
}

export default Signup;
