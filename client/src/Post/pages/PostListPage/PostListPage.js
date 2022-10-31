import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
// Import Actions
import { addPostRequest, deletePostRequest, fetchPosts } from '../../PostActions';
// Import Selector
import { getUsername, isSignedIn } from '../../../Auth/AuthReducer';
import Logo from '../../../logo.svg';

const Header = () => {
    return (
        <div className="col-12 d-flex align-items-center">
          <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
          <h1 className="mt-4">
            Alaya Blog
          </h1>
        </div>
    );
}

const GuestContent = ({ deletePost, posts }) => {
    return (
        <div className="col-12">
          <PostList deletePost={deletePost} posts={posts} />
        </div>
    );
}

const SignedInContent = ({ addPost, deletePost, posts }) => {
    return (
        <>
          <div className="col-6">
            <PostCreateWidget addPost={addPost} />
          </div>
          <div className="col-6">
            <PostList deletePost={deletePost} posts={posts} />
          </div>
        </>
    );
}

const PostListPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.data);
    const isAuthenticated = useSelector(isSignedIn);
    const username = useSelector(getUsername);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleDeletePost = post => {
        if (confirm('Do you want to delete this post?')) { // eslint-disable-line
            dispatch(deletePostRequest(post));
        }
    };

    const handleAddPost = (post) => {
        dispatch(addPostRequest({
            name: username,
            ...post
        }));
    };

    const content = isAuthenticated
          ? <SignedInContent addPost={handleAddPost} deletePost={handleDeletePost} posts={posts} />
          : <GuestContent deletePost={handleDeletePost} posts={posts} />

    return (
        <div className="container">
          <div className="row">
            <Header/>
          </div>
          <hr />
          <div className="row">
            { content }
          </div>
        </div>
    );
};

export default PostListPage;
