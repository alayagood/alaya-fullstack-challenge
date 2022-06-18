import React, { useEffect } from "react";
import { logoutUser } from "../redux/user";
import { useDispatch } from "react-redux";

export function LogoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <div>
      <h1>See you again!</h1>
      <p>We will redirect you soon</p>
    </div>
  );
}

export default LogoutPage;
