import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import callApi from "../../util/apiCaller";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function Login() {
  const history = useHistory();
  const [submitError, setSubmitError] = useState("");

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

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          margin="normal"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </div>
      <div className="text-center">
        {submitError && <div className="text-danger mb-3">{submitError}</div>}
        <Button
          type="submit"
          variant="contained"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Submitting..." : "Login"}
        </Button>
      </div>
    </form>
  );
}

export default Login;
