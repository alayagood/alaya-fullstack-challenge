import React from "react";
import { useHistory } from "react-router-dom";

export function ManagePage() {
  const history = useHistory();

  return (
    <div className="container">
      <button onClick={() => history.push("/logout")}>LOGOUT</button>
    </div>
  );
}

export default ManagePage;
