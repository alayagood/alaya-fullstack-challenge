import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/user/userSelectors";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import MUILink from "@material-ui/core/Link";

function Navbar() {
  const user = useSelector(getUser);

  return (
    <AppBar position="fixed">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography variant="h6">
          <Link to="/">
            <MUILink component="span" className="text-white">
              Home
            </MUILink>
          </Link>
        </Typography>
        <Typography variant="h6">
          <Link to={user.username ? "/manage" : "/login"}>
            <MUILink component="span" className="text-white">
              {user.username ? user.username : "Login/Signup"}
            </MUILink>
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
