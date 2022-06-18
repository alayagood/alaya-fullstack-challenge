import React, { useEffect } from "react";
import { logoutUser } from "../redux/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export function LogoutPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  // TODO: use connected-router to redirect in action/reducer instead of here
  useEffect(() => {
    dispatch(logoutUser());
    setTimeout(() => {
      history.replace("/");
    }, 3000);
  }, [dispatch, history]);

  return (
    <div>
      <h1>See you again!</h1>
      <p>We will redirect you soon</p>
    </div>
  );
}

export default LogoutPage;
