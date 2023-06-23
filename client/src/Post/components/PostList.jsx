import React from "react";
import PropTypes from "prop-types";

import PostListItem from "./PostListItem";
import {Box, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  cardWrapper: {
    border: "1px solid #ccc",
    borderRadius: '5%',
    padding: '5px'
  },
  cardContent: {
    overflowY: 'auto',
    maxHeight: '380px',
    maxWidth: '600px',
    padding: '5px'
  },
});

function PostList({ posts, handleDeletePost }) {
  const classes = useStyles();

  return (
   <Box className={`mt-3 ${classes.cardWrapper}`}>
      <h3 className="my-2">Posts</h3>
   <Box className={classes.cardContent}>
      {posts &&
        posts.map((post) => (
          <PostListItem
            post={post}
            key={post.cuid}
            onDelete={() => handleDeletePost(post.cuid)}
          />
        ))}
    </Box>
    </Box>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostList;
