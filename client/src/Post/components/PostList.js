import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Import Selector
import { getUsername, isSignedIn } from '../../Auth/AuthReducer';

// Import Components
import PostListItem from './PostListItem';


const shouldDisplayDeleteButton = (post, isAuthenticated, username) => {
    return isAuthenticated && isAuthor(username, post);
}

// TODO: change to CUID
const isAuthor = (username, post) => username === post.name;

function PostList({ posts, deletePost }) {
    const isAuthenticated = useSelector(isSignedIn);
    const username = useSelector(getUsername);

    return (
        <div className="d-flex flex-column w-100">
          <h3 className="mt-4">Posts</h3>
          {
              posts.map(post => (
                  <PostListItem
                    post={post}
                    key={post.cuid}
                    displayDeleteButton={shouldDisplayDeleteButton(post, isAuthenticated, username)}
                    deletePost={() => deletePost(post.cuid)}
                  />
              ))
          }
        </div>
    );
}

PostList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        cuid: PropTypes.string.isRequired,
    })).isRequired,
    deletePost: PropTypes.func.isRequired,
};

export default PostList;
