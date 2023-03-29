// import React from "react";
import { useSelector } from "react-redux";
// import { Redirect, Route } from "react-router-dom";

// const ProtectedRoute = ({ path, children }) => {
//   const auth = useSelector((store) => store.userLogin.userToken);

//   return auth ?
//       children : <Redirect to="/login" />;
// };

// export default ProtectedRoute;


import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getUserToken } from "../User/UserReducer";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(getUserToken);
  return (
  <Route
    {...rest}
    render={(props) =>
      auth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
  )};

export default ProtectedRoute;