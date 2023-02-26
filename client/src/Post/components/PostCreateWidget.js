import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import axios from 'axios';
// Import Style

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

const PostCreateWidget = ({ addPost }) => {

  const [state, setState] = useState({});
  const classes = useStyles();
  const user = useSelector(state => state.user.user);
  const [loading, setLoading] = useState(false);

  const imageUploader = async (image) => {
    const data = new FormData()
    data.append("image", image)
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/image`, data, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  }

  const submit = async () => {
    if (state.title && state.content) {
      setLoading(true);
      try {
        let post = state;
        if (state.img) {
          const imgResp = await imageUploader(state.img);
          const img = imgResp.image;
          post = { ...post, img };
        }
        addPost(post);
      } catch (e) { }
      setState({});
      setLoading(false);
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const setImage = async (evt) => {
    setState({
      ...state,
      img: evt.target.files[0]
    });
  }

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Create new post</h3>
      <TextField variant="filled" label="Author name" disabled={true} value={user.name} />
      <TextField variant="filled" label="Post title" name="title" onChange={handleChange} value={state.title || ""} />
      <TextField variant="filled" multiline minRows="4" label="Post content" name="content" onChange={handleChange} value={state.content || ""} />
      {state.img && <img src={URL.createObjectURL(state.img)} className="rounded d-block img-thumbnail" alt="Loading..." />}
      <Button className="mt-4" variant="contained" color="primary" component="label" disabled={loading}>
        Add image
        <input type="file" hidden onChange={setImage} name="image" accept="image/*" />
      </Button>
      <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.title || !state.content || loading}>
        Submit
      </Button>
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
