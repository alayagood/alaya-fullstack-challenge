import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import callApi from "../../util/apiCaller";

function Login() {
  const history = useHistory();
  const [submitError, setSubmitError] = useState("");
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values, {setSubmitting}) => {
    callApi("login", "post", {
      email: values.username,
      password: values.password,
    })
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setSubmitError(err.json.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({isSubmitting}) => (
        <Form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field
              type="text"
              className="form-control"
              id="username-input"
              name="username"
              placeholder="Enter username"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
          {submitError && <div className="text-danger">{submitError}</div>}
        </Form>
      )}
    </Formik>
  );
}

export default Login;
