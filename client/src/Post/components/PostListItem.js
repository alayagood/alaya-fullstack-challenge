import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from '@material-ui/core';
import { useSelector } from 'react-redux';

function PostListItem({ post, onDelete }) {
  const currentUser = useSelector((state) => JSON.parse(state.auth.user));

  if (!post) {
    return null;
  }

  const isCurrentUserPost = currentUser && post.createdBy === currentUser._id;

  const firstImageUrl = post.images && post.images.length > 0 ? post.images[0].url : null;

  return (
      <Card className="w-100 my-4">
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Link to={`/posts/${post.cuid}/${post.slug}`}>{post.title}</Link>
          </Typography>
          {firstImageUrl && (
              <CardMedia component="img" src={firstImageUrl} alt={post.title} height="200" />
          )}
          <Typography component="p" className="mt-3">
            {post.content}
          </Typography>
          <Typography color="textSecondary" component="p" className="mt-3 font-italic">
            From {post.name}
          </Typography>
        </CardContent>
        <CardActions>
          {isCurrentUserPost && (
              <Button size="small" color="secondary" onClick={onDelete}>
                Delete post
              </Button>
          )}
        </CardActions>
      </Card>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
    ),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
