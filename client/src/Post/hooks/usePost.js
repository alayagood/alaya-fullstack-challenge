import {useState} from "react";

const initialState = {images: [], name: "", title: "", content: ""};

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

  const addImgToPost = (img) => {
    setPost({
      ...post,
      images: [...post.images, img],
    });
  };
  const togglePostImg = (img) => {
    const imgs = post.images;
    const pos = imgs.indexOf(img);
    if (pos === -1) {
      addImgToPost(img);
    } else {
      setPost({
        ...post,
        images: [...post.images.slice(0, pos), ...post.images.slice(pos + 1)],
      });
    }
  };

  return {post, updatePost, resetPost, addImgToPost, togglePostImg};
};

export default usePost;
