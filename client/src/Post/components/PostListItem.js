import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const DeleteButton = ({ deletePost }) => {
  return (
    <CardActions>
      <Button size="small" color="secondary" onClick={deletePost}>
        Delete post
      </Button>
    </CardActions>
  );
}

function PostListItem({ post, displayDeleteButton, deletePost }) {
  return (
    <Card className="w-100 my-4">
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
      { displayDeleteButton && <DeleteButton deletePost={deletePost} /> }
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
  deletePost: PropTypes.func,
};

export default PostListItem;
