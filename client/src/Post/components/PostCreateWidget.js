import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {getUser} from "../../Access/AccessReducer";
// Import Style

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const PostCreateWidget = ({addPost}) => {
  const {user} = useSelector((state) => getUser(state));
  const [state, setState] = useState({});
  const classes = useStyles();

  useEffect(
    function setDefaultAuthorName() {
      if (user) {
        setState({...state, name: user.name});
      }
    },
    [user]
  );

  const submit = () => {
    if (state.name && state.title && state.content) {
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
        variant="filled"
        label="Author name"
        name="name"
        onChange={handleChange}
        value={state.name}
        InputLabelProps={{shrink: !!state.name}}
      />
      <TextField
        variant="filled"
        label="Post title"
        name="title"
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        multiline
        rows="4"
        label="Post content"
        name="content"
        onChange={handleChange}
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
