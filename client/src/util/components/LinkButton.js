import React from "react";
import {Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  linkButton: {
    padding: 0,
    minWidth: 0,
    fontSize: "inherit",
    fontWeight: "inherit",
    textTransform: "none",
    color: theme.palette.primary.main,
    textDecoration: "underline",
    "&:hover": {
      backgroundColor: "transparent",
      textDecoration: "none",
    },
  },
}));

function LinkButton({children, ...rest}) {
  const classes = useStyles();

  return (
    <Button className={classes.linkButton} {...rest}>
      {children}
    </Button>
  );
}

export default LinkButton;
