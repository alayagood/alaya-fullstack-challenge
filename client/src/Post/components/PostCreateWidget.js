import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { userDataSelector } from "../../redux/user";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
// Import Style

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const PostCreateWidget = ({ addPost }) => {
  const userData = useSelector(userDataSelector);
  const [state, setState] = useState(() => ({
    name: userData.name,
    content: "",
    title: "",
  }));
  const classes = useStyles();

  const submit = () => {
    if (state.title.length > 0 && state.content.length > 0) {
      addPost(state);
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Create new post</h3>
      <TextField
        disabled
        variant="filled"
        label={userData.name ? "Author name" : "You need to be authenticated"}
        name="name"
        onChange={handleChange}
        defaultValue={state.name}
      />
      <TextField
        variant="filled"
        label="Post title"
        name="title"
        onChange={handleChange}
        defaultValue={state.title}
      />
      <TextField
        variant="filled"
        multiline
        rows="4"
        label="Post content"
        name="content"
        onChange={handleChange}
        defaultValue={state.content}
      />
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => submit()}
        disabled={!state.name || !state.title || !state.content}
      >
        Submit
      </Button>
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default PostCreateWidget;
