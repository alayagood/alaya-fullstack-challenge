import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { selectIsLoggedIn } from "../../User/UserSelectors";
import { logoutUser } from "../../User/UserActions";

function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const logout = () => dispatch(logoutUser());
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">
          <Link href="/" className="text-white">
            Home
          </Link>
        </Typography>
        {isLoggedIn && (
          <ButtonGroup className="ml-auto">
            <Button onClick={logout}>Logout</Button>
          </ButtonGroup>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
