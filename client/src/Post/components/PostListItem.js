import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';

function PostListItem({ post, onDelete }) {
  return (
    <Card className="w-100 my-4">
      {
        post.media &&
        <CardMedia
          component="img"
          image={post.media}
          alt={`post-media-${post.title}`}
        />
      }
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            <Link to={`/posts/${post.cuid}/${post.slug}`} >
              {post.title}
            </Link>
          </Typography>
          <Typography component="p" className="mt-3">
            {post.content}
          </Typography>
          <Typography color="textSecondary" component="p" className="mt-3 font-italic">
            From {post.name}
          </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" onClick={onDelete}>
          Delete post
        </Button>
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
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
