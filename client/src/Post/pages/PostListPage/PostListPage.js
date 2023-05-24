import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
// Import Actions
import { addPostRequest, deletePostRequest, fetchPosts } from '../../PostActions';
import Logo from '../../../logo.svg';

const PostListPage = ({ showAddPost }) => {

  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.data);
  const [error,setError] = useState("");

  const [token, setToken] =  useState(localStorage.getItem('token'));

  useEffect(() => {
    dispatch(fetchPosts());
  },[]);

  const handleDeletePost = post => {
    setToken(localStorage.getItem('token'));
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      dispatch(deletePostRequest(post)).then( res => {
        if(res){
          console.log(res);
          if(!res.ok){setError(res.status + ': ' + res.statusText)}
        }
        else{setError("Deleted!");}
      });
    }
  };

  const handleAddPost = (post) => {
    setToken(localStorage.getItem('token'));
    dispatch(addPostRequest(post)).then( res => {
      if(!res.post){
        if(!res.ok){setError(res.status + ': ' + res.statusText)}
      }
      else{setError("Added!");}
      console.log(res);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
          <h1 className="mt-4">
             Alaya Blog
          </h1>
        </div>
      </div>
      <hr />
      <div>
        <h8>
          {!token ? (
          <label>User does not have acces. Need to Login!</label>
          ) : (<label>User is logged in!</label>)}
        </h8>
        <br/>
        <h8>
          {error}
        </h8>
      </div>
      <div className="row">
        <div className="col-6">
          <PostCreateWidget addPost={handleAddPost} showAddPost={showAddPost} />
        </div>
        <div className="col-6">
          <PostList handleDeletePost={handleDeletePost} posts={posts} />
        </div>
      </div>
    </div>
  );
};

PostListPage.propTypes = {
  showAddPost: PropTypes.bool.isRequired
};


export default PostListPage;
