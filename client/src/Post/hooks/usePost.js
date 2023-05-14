import {useState} from "react";

const initialState = {name: "", title: "", content: ""};

const usePost = () => {
  const [post, setPost] = useState(initialState);

  const updatePost = (field, value) => {
    setPost({
      ...post,
      [field]: value,
    });
  };

  const resetPost = (defaultValues) => {
    setPost({...initialState, ...defaultValues});
  };

  return {post, updatePost, resetPost};
};

export default usePost;
